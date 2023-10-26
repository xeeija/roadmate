import { Notification } from "../Notification";


export interface NotificationListItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: Notification[] | undefined;
}
