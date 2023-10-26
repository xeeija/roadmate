import { Route } from "../Route";


export interface RouteListItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: Route[] | undefined;
}
