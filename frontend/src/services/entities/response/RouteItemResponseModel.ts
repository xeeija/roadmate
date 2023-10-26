import { Route } from "../Route";


export interface RouteItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: Route;
}
