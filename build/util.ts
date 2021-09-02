import * as fs from 'fs';
import * as cp from 'child_process';
import * as glob from 'glob';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { Config, PackageDescription } from './config';

export type RunnerFn = (config: Config) => Promise<any>;
export type TaskDef = [string, RunnerFn];
export type BaseFn = (command: string) => string;

export function copy(target: string, destination: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fsExtra.copy(target, destination, err => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export function remove(target: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fsExtra.remove(target, err => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export function writeFile(target: string, contents: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(target, contents, err => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export function getListOfFiles(
    globPath: string,
    exclude?: string
): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        const options: { ignore?: string } = exclude ? { ignore: exclude } : {};

        glob(globPath, options, (error, matches) => {
            if (error) {
                return reject(error);
            }

            resolve(matches);
        });
    });
}

export function removeRecursively(globRecursively: string): Promise<void> {
    return new Promise((resolve, reject) => {
        rimraf(globRecursively, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function exec(
    command: string,
    args: Array<string>,
    base: BaseFn = fromNpm
): Promise<string> {
    return new Promise((resolve, reject) => {
        cp.exec(base(command) + ' ' + args.join(' '), (err, stdout) => {
            if (err) {
                return reject(err);
            }

            resolve(stdout.toString());
        });
    });
}

export function cmd(command: string, args: Array<string>): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return exec(command, args, (command: string) => command);
}

export function git(args: Array<string>): Promise<string> {
    return cmd('git', args);
}

export function ignoreErrors<T>(promise: Promise<T>): Promise<T | null> {
    return promise.catch(() => null);
}

export function fromNpm(command: string): string {
    return baseDir(`./node_modules/.bin/${command}`);
}

export function getPackageFilePath(pkg: string, filename: string): string {
    return baseDir(`./src/${pkg}/${filename}`);
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sorcery: any = require('sorcery');
export async function mapSources(file: string): Promise<void> {
    const chain: any = await sorcery.load(file);
    chain.write();
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ora: any = require('ora');
async function runTask(name: string, taskFn: () => Promise<any>): Promise<void> {
    const spinner: any = ora(name);

    try {
        spinner.start();

        await taskFn();

        spinner.succeed();
    } catch (e) {
        spinner.fail();

        throw e;
    }
}

export function createBuilder(tasks: Array<TaskDef>) {
    return async function(config: Config) {
        for (let [name, runner] of tasks) {
            await runTask(name, () => runner(config));
        }
    };
}

export function flatMap<K, J>(list: Array<K>, mapFn: (item: K) => Array<J>): Array<J> {
    return list.reduce(
        function(newList: Array<J>, nextItem: K) {
            return [...newList, ...mapFn(nextItem)];
        },
        [] as Array<J>
    );
}

export function getTopLevelPackages(config: Config): Array<string> {
    return config.packages.map(packageDescription => packageDescription.name);
}

export function getTestingPackages(config: Config): Array<string> {
    return flatMap(config.packages, ({ name, hasTestingModule }) => {
        if (hasTestingModule) {
            return [`${name}/testing`];
        }

        return [];
    });
}

export function getAllPackages(config: Config): Array<string> {
    return flatMap(config.packages, ({ name, hasTestingModule }) => {
        if (hasTestingModule) {
            return [name, `${name}/testing`];
        }

        return [name];
    });
}

export function getDestinationName(packageName: string): string {
    return packageName.replace('/testing', '-testing');
}

export function getTopLevelName(packageName: string): string {
    return packageName.replace('/testing', '');
}

export function getBottomLevelName(packageName: string): string {
    return packageName.includes('/testing') ? 'testing' : packageName;
}

export function baseDir(...dirs: Array<string>): string {
    return `"${path.resolve(__dirname, '../', ...dirs)}"`;
}

export function shouldBundle(config: Config, packageName: string): boolean {
    const pkg: PackageDescription | undefined = config.packages.find(pkgX => pkgX.name === packageName);

    return pkg ? pkg.bundle : false;
}
