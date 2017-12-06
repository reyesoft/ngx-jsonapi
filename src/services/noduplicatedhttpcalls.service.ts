import { Deferred } from '../shared/deferred';

export class NoDuplicatedHttpCallsService {
    public calls: { [path: string]: Array<Deferred<any>> } = {};

    public hasPromises(path: string) {
        return (path in this.calls);
    }

    public async getAPromise(path: string): Promise<any> {
        if (!(path in this.calls)) {
            this.calls[path] = [];
        }

        let deferred: Deferred<any> = new Deferred();
        // let deferred = this.$q.defer();
        this.calls[path].push(deferred);

        return deferred.promise;
    }

    public async setPromiseRequest(path, promise: Promise<any>) {
        promise.then(
            success => {
                if (path in this.calls) {
                    for (let promise2 of this.calls[path]) {
                        promise2.resolve(success);
                    }
                    delete this.calls[path];
                }
            }
        ).catch(
            error => {
                if (path in this.calls) {
                    for (let promise2 of this.calls[path]) {
                        promise2.reject(error);
                    }
                    delete this.calls[path];
                }
            }
        );
    }
}
