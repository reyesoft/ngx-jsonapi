import { IDocument } from './document';

interface IErrors extends IDocument {
    errors: [
        {
            code?: string,
            source?: {
                attributes?: string,
                pointer: string
            },
            title?: string,
            detail?: string
        }
    ];
}
