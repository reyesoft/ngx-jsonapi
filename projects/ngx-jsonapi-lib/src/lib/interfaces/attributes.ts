export interface IAttributes {
    // problem with lines like
    /*
    this._receipt_number = order.attributes.receipt_number;
    this.transaction.attributes._due_date_with_format = new Date(this.transaction.attributes.due_date);
    */
    // [value: string]: boolean | string | number;
    [value: string]: any;
}
