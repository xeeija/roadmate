import { Notification } from "./Notification";
import { User } from "./User";


export interface Route {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    userId?: string;
    name?: string | undefined;
    fromLat?: number;
    fromLon?: number;
    toLat?: number;
    toLon?: number;
    fromAddressName?: string | undefined;
    toAddressName?: string | undefined;
    notificationEnabled?: boolean;
    user?: User;
    notifications?: Notification[] | undefined;
}
