import { DangerRequest } from "./request/DangerRequest";
import { ExpertRequest } from "./ExpertRequest";
import { Notification } from "./Notification";


export interface User {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    username?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    role?: Role;
    isBanned?: boolean;
    notificationAllowed?: boolean;
    expertRequests?: ExpertRequest[] | undefined;
    approvedExpertRequests?: ExpertRequest[] | undefined;
    dangerRequests?: DangerRequest[] | undefined;
    notifications?: Notification[] | undefined;
}

export enum Role {
    User = "User",
    Expert = "Expert",
    Admin = "Admin"
}

