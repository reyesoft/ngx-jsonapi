// export class Deferred {
//     public promise: Promise<any>;
//     public reject: Function;
//     public resolve: Function;
//
//     constructor() {
//         this.promise = new Promise((resolve, reject)=> {
//             this.reject = reject
//             this.resolve = resolve
//         })
//     }
// }

export class Deferred<T> {
    public promise: Promise<T>;
    public resolve: (value?: T | PromiseLike<T>) => void;
    public reject: (reason?: any) => void;

    public constructor() {
        this.promise = new Promise<T>(
            (resolve, reject): void => {
                this.resolve = resolve;
                this.reject = reject;
            }
        );
    }
}
