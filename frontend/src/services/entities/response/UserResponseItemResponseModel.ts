import { UserResponse } from "../UserResponse";


export interface UserResponseItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: UserResponse;
}
