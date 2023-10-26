import { ExpertRequest } from "../ExpertRequest";


export interface ExpertRequestListItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: ExpertRequest[] | undefined;
}
