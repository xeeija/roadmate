import { Danger } from "../Danger";


export interface DangerItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: Danger;
}
