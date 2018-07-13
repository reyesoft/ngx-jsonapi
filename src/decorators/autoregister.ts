import { Service } from '../service';

export function Autoregister() {
    // @todo specify the correct types `return function<T extends typeof Service>(target: T): T`
    return (target: any): any => {
        // save a reference to the original constructor
        let original = target;

        // the new constructor behaviour
        let f: any = function(...args) {
            console.log('this', this);
            console.log('args', args);
            let instance = original.apply(this, args);
            instance.register();
            console.log('instance in new constructor', instance);

            return instance;
        };

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
    };
}
