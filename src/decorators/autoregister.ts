export function Autoregister() {
    return (target): any => {
        const original = target;

        /*tslint:disable: only-arrow-functions*/
        // function name is required
        const newConstructor: any = function newCtor(...args) {
            const c: any = function childConstuctor() {
                return original.apply(this, arguments);
            };
            c.prototype = Object.create(original.prototype);
            const instance = new c(...args);
            instance.register();

            return instance;
        };

        newConstructor.prototype = Object.create(target.prototype);

        return newConstructor;
    };
}
