import { Deferred } from '../shared/deferred';

export class NoDuplicatedHttpCallsService {
    public calls: { [path: string]: Array<Deferred<any>> } = {};

    public hasPromises(path: string) {
        return (path in this.calls);
    }

    public getAPromise(path: string): Promise<any> {
        if (!(path in this.calls)) {
            this.calls[path] = [];
        }

        let deferred = new Deferred();
        // let deferred = this.$q.defer();
        this.calls[path].push(deferred);

        return deferred.promise;
    }

    public setPromiseRequest(path, promise: Promise<any>) {
        promise.then(
            success => {
                if (path in this.calls) {
                    for (let promise of this.calls[path]) {
                        promise.resolve(success);
                    }
                    delete this.calls[path];
                }
            }
        ).catch(
            error => {
                if (path in this.calls) {
                    for (let promise of this.calls[path]) {
                        promise.reject(error);
                    }
                    delete this.calls[path];
                }
            }
        );
    }
}
// migrationProblem
// angular.module('Jsonapi.services').service('noDuplicatedHttpCallsService', NoDuplicatedHttpCallsService);
