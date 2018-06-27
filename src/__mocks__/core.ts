// TODO: fix ciercular dependencies => COL-1448 (si no se necesita más la clase, puede borrarse)

export class Core {
    public me: Core;
    public constructor() {
        this.me = this;
    }
    public refreshLoadings(attr) {
        return attr;
    }
}
