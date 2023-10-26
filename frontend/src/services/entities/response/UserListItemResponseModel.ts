import { User } from "../User";


export interface UserListItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: User[] | undefined;
}
