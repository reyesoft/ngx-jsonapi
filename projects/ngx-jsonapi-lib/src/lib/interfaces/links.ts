// http://org/format/#document-links
export interface ILinks {
    self?: string;
    related?: {
        href: string;
        meta: object;
    };
}
