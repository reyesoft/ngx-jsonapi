import { Deferred } from '../shared/deferred';
export declare class NoDuplicatedHttpCallsService {
    calls: {
        [path: string]: Array<Deferred<any>>;
    };
    hasPromises(path: string): boolean;
    getAPromise(path: string): Promise<any>;
    setPromiseRequest(path: string, promise: Promise<any>): Promise<void>;
}
