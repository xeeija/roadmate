import { Notification } from "../Notification";


export interface NotificationItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: Notification;
}
