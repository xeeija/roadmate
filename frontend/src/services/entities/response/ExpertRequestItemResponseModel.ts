import { ExpertRequest } from "../ExpertRequest";


export interface ExpertRequestItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: ExpertRequest;
}
