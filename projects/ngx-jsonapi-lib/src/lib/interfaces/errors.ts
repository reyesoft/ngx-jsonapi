import { IDocument } from './document';

export interface IErrors extends IDocument {
    errors: [
        {
            code?: string;
            source?: {
                attributes?: string;
                pointer: string;
            };
            title?: string;
            detail?: string;
        }
    ];
}
