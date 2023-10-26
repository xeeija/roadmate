import { Danger } from "./Danger";
import { User } from "./User";
import { Route } from "./Route";


export interface Notification {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    description?: string | undefined;
    url?: string | undefined;
    readAt?: Date | undefined;
    userId?: string;
    routeId?: string;
    dangerId?: string;
    user?: User;
    route?: Route;
    danger?: Danger;
}
