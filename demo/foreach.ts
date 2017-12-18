export function forEach(collection: any, fc: any) {
    Object.keys(collection).forEach(key => {
        fc(key, collection[key]);
    });
}
