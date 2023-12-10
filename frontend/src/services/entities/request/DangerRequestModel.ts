import { RequestType } from "./DangerRequest";


export interface DangerRequestModel {
    type?: RequestType;
    timestamp?: Date;
    userId?: string;
    dangerId?: string;
}
