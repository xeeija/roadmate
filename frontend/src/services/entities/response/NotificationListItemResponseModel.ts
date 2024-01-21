import { Notification } from "../Notification";


export interface NotificationListItemResponseModel {
    readAt?: Date | undefined;
    description: string;
    danger?: string,
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: Notification[] | undefined;
}
