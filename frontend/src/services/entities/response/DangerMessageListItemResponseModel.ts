import { DangerMessage } from "../DangerMessage";


export interface DangerMessageListItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: DangerMessage[] | undefined;
}
