import { DangerRequest } from "../request/DangerRequest";


export interface DangerRequestItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: DangerRequest;
}
