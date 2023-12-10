import { DangerRequest } from "../request/DangerRequest";


export interface DangerRequestListItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: DangerRequest[] | undefined;
}
