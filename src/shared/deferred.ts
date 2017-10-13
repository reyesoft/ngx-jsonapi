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
  promise: Promise<T>;
  resolve: (value?: T | PromiseLike<T>) => void;
  reject:  (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject  = reject;
    });
  }
}
