export function forEach(collection, fc) {
    Object.keys(collection).forEach(key => {
        fc(key, collection[key]);
    });
}
