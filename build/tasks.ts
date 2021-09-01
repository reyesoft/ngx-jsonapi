import { Config } from './config';
import * as util from './util';

/**
 * Cleans the top level dist folder. All npm-ready packages are created
 * in the dist folder.
 */
export function removeDistFolder(config: Config): Promise<string> {
    return util.exec('rimraf', ['./dist']);
}

/**
 * Uses the 'tsconfig-build.json' file in each package directory to produce
 * AOT and Closure compatible JavaScript
 */
export async function compilePackagesWithNgc(config: Config): Promise<void> {
    const pkgs: Array<string> = util.getTopLevelPackages(config);
    const storePkg: string = 'store';
    const restPkgs: Array<string> = pkgs.filter(name => name !== storePkg);
    const testPkgs: Array<string> = util.getTestingPackages(config);

    await _compilePackagesWithNgc(storePkg);
    await mapAsync(restPkgs, _compilePackagesWithNgc);
    await mapAsync(testPkgs, _compilePackagesWithNgc);
}

async function _compilePackagesWithNgc(pkg: string): Promise<void> {
    // await util.exec('ngc', [`-p ./src/${pkg}/tsconfig-build.json`]);
    await util.exec('ngc', [`-p ./src/tsconfig-build.json`]);

    /**
     * Test modules are treated differently because nested inside top-level.
     * This step removes the top-level package from testing modules from the
     * export statement.
     * Also changes the module name from 'index' to 'testing'
     * i.e. export * from './effects/testing/index' becomes './testing/testing';
     *
     * See https://github.com/ngrx/platform/issues/94
     */
    let [exportPath, moduleName]: Array<string> = /\/testing$/.test(pkg)
        ? [pkg.replace(/(.*\/)testing/i, 'testing'), 'testing']
        : [pkg, 'index'];

    const entryTypeDefinition: string = `export * from './${exportPath}/${moduleName}';`;
    const entryMetadata: string = `{"__symbolic":"module","version":3,"metadata":{},"exports":[{"from":"./${pkg}/index"}]}`;

    await Promise.all([
        util.writeFile(`./dist/${pkg}.d.ts`, entryTypeDefinition),
        util.writeFile(`./dist/${pkg}.metadata.json`, entryMetadata)
    ]);
}

/**
 * Uses Rollup to bundle the JavaScript into a single flat file called
 * a FESM (Flat Ecma Script Module)
 */
export async function bundleFesms(config: Config): Promise<void> {
    const pkgs: Array<string> = util.getAllPackages(config);

    await mapAsync(pkgs, async pkg => {
        if (!util.shouldBundle(config, pkg)) {
            return;
        }
        const topLevelName: string = util.getTopLevelName(pkg);

        await util.exec('rollup', [
            // `-i ./dist/packages/${pkg}/index.js`,
            `-i ./dist/index.js`,
            `-o ./dist/${topLevelName}/${config.scope}/${pkg}.js`,
            `-f es`,
            `--sourcemap`
        ]);

        await util.mapSources(
            `./dist/${topLevelName}/${config.scope}/${pkg}.js`
        );
    });
}

/**
 * Copies each FESM into a TS file then uses TypeScript to downlevel
 * the FESM into ES5 with ESM modules
 */
export async function downLevelFesmsToES5(config: Config): Promise<void> {
    const packages: Array<string> = util.getAllPackages(config);
    const tscArgs: Array<string> = [
        '--target es5',
        '--module es2015',
        '--noLib',
        '--sourceMap'
    ];

    await mapAsync(packages, async pkg => {
        if (!util.shouldBundle(config, pkg)) {
            return;
        }
        const topLevelName: string = util.getTopLevelName(pkg);

        const file: string = `./dist/${topLevelName}/${config.scope}/${pkg}.js`;
        const target: string = `./dist/${topLevelName}/${config.scope}/${pkg}.es5.ts`;

        await util.copy(file, target);
        await util.ignoreErrors(util.exec('tsc', [target, ...tscArgs]));
        await util.mapSources(target.replace('.ts', '.js'));
        await util.remove(target);
    });

    await util.removeRecursively(`./dist/**/*/${config.scope}/*.ts`);
}

/**
 * Re-runs Rollup on the downleveled ES5 to produce a UMD bundle
 */
export async function createUmdBundles(config: Config): Promise<void> {
    await mapAsync(util.getAllPackages(config), async pkg => {
        if (!util.shouldBundle(config, pkg)) {
            return;
        }
        const topLevelName: string = util.getTopLevelName(pkg);
        const destinationName: string = util.getDestinationName(pkg);

        // const rollupArgs = [`-c ./src/${pkg}/rollup.config.js`, `--sourcemap`];
        const rollupArgs: Array<string> = [`-c ./src/rollup.config.js`, `--sourcemap`];

        await util.exec('rollup', rollupArgs);
        await util.mapSources(
            `./dist/${topLevelName}/bundles/${destinationName}.umd.js`
        );
    });
}

/**
 * Removes any leftover TypeScript files from previous compilation steps,
 * leaving any type definition files in place
 */
export async function cleanTypeScriptFiles(config: Config): Promise<void> {
    const tsFilesGlob: string = './dist/**/*.ts';
    const dtsFilesFlob: string = './dist/**/*.d.ts';
    const filesToRemove: Array<string> = await util.getListOfFiles(tsFilesGlob, dtsFilesFlob);

    await mapAsync(filesToRemove, util.remove);
}

/**
 * Removes any leftover Javascript files from previous compilation steps,
 * leaving the bundles and FESM in place
 */
export async function cleanJavaScriptFiles(config: Config): Promise<void> {
    const packages: Array<string> = util
        .getTopLevelPackages(config)
        .filter(pkg => !util.shouldBundle(config, pkg));
    const jsFilesGlob: string = './dist/**/*.js';
    const jsExcludeFilesFlob: string = './dist/(bundles|ngx-jsonapi)/**/*.js';
    const filesToRemove: Array<string> = await util.getListOfFiles(
        jsFilesGlob,
        jsExcludeFilesFlob
    );

    const filteredFilesToRemove: Array<string> = filesToRemove.filter((file: string) =>
        packages.some(pkg => file.indexOf(pkg) === -1)
    );

    await mapAsync(filteredFilesToRemove, util.remove);
}

/**
 * Renames the index files in each package to the name
 * of the package.
 */
export async function renamePackageEntryFiles(config: Config): Promise<void> {
    await mapAsync(util.getAllPackages(config), async pkg => {
        if (!util.shouldBundle(config, pkg)) {
            return;
        }
        const bottomLevelName: string = util.getBottomLevelName(pkg);

        const files: Array<string> = await util.getListOfFiles(`./dist/${pkg}/index.**`);

        await mapAsync(files, async file => {
            const target: string = file.replace('index', bottomLevelName);

            await util.copy(file, target);
            await util.remove(file);
        });
    });
}

/**
 * Removes any remaining source map files from running NGC
 */
export async function removeRemainingSourceMapFiles(config: Config): Promise<void> {
    const packages: Array<string> = util.getTopLevelPackages(config);

    await util.removeRecursively(`./dist/?(${packages.join('|')})/**/*.map`);
}

/**
 * Copies the type definition files and NGC metadata files to
 * the root of the distribution
 */
export async function copyTypeDefinitionFiles(config: Config): Promise<void> {
    /*
  const packages = util.getTopLevelPackages(config);
  const files = await util.getListOfFiles(
    `./dist/?(${packages.join('|')})/**   /*.*`
  );

  await mapAsync(files, async file => {
    const target = file.replace('packages/', '');
    await util.copy(file, target);
  });

  // await util.removeRecursively(`./dist/?(${packages.join('|')})`);
  await util.removeRecursively(`./dist/?`);
  */
}

/**
 * Creates minified copies of each UMD bundle
 */
export async function minifyUmdBundles(config: Config): Promise<void> {
    const uglifyArgs: Array<string> = ['-c', '-m', '--comments'];

    await mapAsync(util.getAllPackages(config), async pkg => {
        if (!util.shouldBundle(config, pkg)) {
            return;
        }
        const topLevelName: string = util.getTopLevelName(pkg);
        const destinationName: string = util.getDestinationName(pkg);
        const file: string = `./dist/${topLevelName}/bundles/${destinationName}.umd.js`;
        const out: string = `./dist/${topLevelName}/bundles/${destinationName}.umd.min.js`;

        return util.exec('uglifyjs', [
            file,
            ...uglifyArgs,
            `-o ${out}`,
            `--source-map "filename='${out}.map' includeSources='${file}', content='${file}.map'"`
        ]);
    });
}

/**
 * Copies the README.md, LICENSE, and package.json files into
 * each package
 */
export async function copyDocs(config: Config): Promise<void> {
    const packages: Array<string> = util.getTopLevelPackages(config);

    await mapAsync(packages, async pkg => {
        // const source = `./src/${pkg}`;
        const source: string = `.`;
        // const target = `./dist/${pkg}`;
        const target: string = `./dist`;

        await Promise.all([
            util.copy(`${source}/README.md`, `${target}/README.md`),
            util.copy('./LICENSE', `${target}/LICENSE`)
        ]);
    });
}

export async function copyPackageJsonFiles(config: Config):Promise<void> {
    const packages: Array<string> = util.getAllPackages(config);

    await mapAsync(packages, async pkg => {
        // const source = `./src/${pkg}`;
        const source: string = `./src`;
        // const target = `./dist/${pkg}`;
        const target: string = `./dist`;

        await util.copy(`${source}/package.json`, `${target}/package.json`);
    });
}

/**
 * Removes the packages folderPromise<void>
 */
export async function removePackagesFolder(config: Config): Promise<void> {
    await util.removeRecursively('./dist');
}

/**
 * Deploy build artifacts to repos
 */
export async function publishToRepo(config: Config): Promise<void> {
    for (let pkg of util.getTopLevelPackages(config)) {
        const SOURCE_DIR: string = `./dist/${pkg}`;
        const REPO_URL: string = `git@github.com:ngrx/${pkg}-builds.git`;
        const REPO_DIR: string = `./tmp/${pkg}`;
        const SHA: string = await util.git([`rev-parse HEAD`]);
        const SHORT_SHA: string = await util.git([`rev-parse --short HEAD`]);
        const COMMITTER_USER_NAME: string = await util.git([
            `--no-pager show -s --format='%cN' HEAD`
        ]);
        const COMMITTER_USER_EMAIL: string = await util.git([
            `--no-pager show -s --format='%cE' HEAD`
        ]);


        /* eslint-disable @typescript-eslint/await-thenable */
        await util.cmd('rm -rf', [`${REPO_DIR}`]);
        await util.cmd('mkdir ', [`-p ${REPO_DIR}`]);
        await process.chdir(`${REPO_DIR}`);
        await util.git([`init`]);
        await util.git([`remote add origin ${REPO_URL}`]);
        await util.git(['fetch origin master --depth=1']);
        await util.git(['checkout origin/master']);
        await util.git(['checkout -b master']);
        await process.chdir('../../');
        await util.cmd('rm -rf', [`${REPO_DIR}/*`]);
        await util.git([
            `log --format="%h %s" -n 1 > ${REPO_DIR}/commit_message`
        ]);
        await util.cmd('cp', [`-R ${SOURCE_DIR}/* ${REPO_DIR}/`]);
        await process.chdir(`${REPO_DIR}`);
        await util.git([`config user.name "${COMMITTER_USER_NAME}"`]);
        await util.git([`config user.email "${COMMITTER_USER_EMAIL}"`]);
        await util.git(['add --all']);
        await util.git([`commit -F commit_message`]);
        await util.cmd('rm', ['commit_message']);
        await util.git(['push origin master --force']);
        await process.chdir('../../');
        /* eslint-disable @typescript-eslint/await-thenable */
    }
}

export function mapAsync<T>(
    list: Array<T>,
    mapFn: (v: T, i: number) => Promise<any>
): Promise<any> {
    return Promise.all(list.map(mapFn));
}

/**
 * Copy schematics files
 */
export async function copySchematicFiles(config: Config): Promise<void> {
    const packages: Array<string> = util
        .getTopLevelPackages(config)
        .filter(pkg => !util.shouldBundle(config, pkg));

    const collectionFiles: Array<string> = await util.getListOfFiles(
        `./src/?(${packages.join('|')})/collection.json`
    );
    const schemaFiles: Array<string> = await util.getListOfFiles(
        `./src/?(${packages.join('|')})/src/*/schema.*`
    );
    const templateFiles: Array<string> = await util.getListOfFiles(
        `./src/?(${packages.join('|')})/src/*/files/*`
    );
    const files: Array<string> = [...collectionFiles, ...schemaFiles, ...templateFiles];

    await mapAsync(files, async file => {
        const target: string = file.replace('src/', 'dist/');
        await util.copy(file, target);
    });
}
