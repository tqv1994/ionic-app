
export class ResponseData{
    status: number = 200;
    data: any;
    success: boolean = true;


    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}