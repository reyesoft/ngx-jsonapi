// export const mockRefreshLoadings = jest.fn();
// const mock = jest.fn().mockImplementation(() => {
//     return {refreshLoadings: mockRefreshLoadings};
// });
//
// export default mock;

export class Core {
    public me: Core;
    public constructor() {
        this.me = this;
    }
    public refreshLoadings(attr) {
        return attr;
    }
}
