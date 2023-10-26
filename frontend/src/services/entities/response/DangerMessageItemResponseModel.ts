import { DangerMessage } from "../DangerMessage";


export interface DangerMessageItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: DangerMessage;
}
