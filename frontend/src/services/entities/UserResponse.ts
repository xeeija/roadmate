import { User } from "./User";
import { AuthenticationInformation } from "./AuthenticationInformation";


export interface UserResponse {
    user?: User;
    authentication?: AuthenticationInformation;
}
