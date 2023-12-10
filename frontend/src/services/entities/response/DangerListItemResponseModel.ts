import { Danger } from "../Danger";


export interface DangerListItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: Danger[] | undefined;
}
