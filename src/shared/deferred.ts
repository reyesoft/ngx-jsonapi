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
