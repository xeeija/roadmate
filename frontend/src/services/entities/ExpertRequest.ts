import { User } from "./User";


export interface ExpertRequest {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    userId?: string;
    description?: string | undefined;
    approvedAt?: Date | undefined;
    approvedUserId?: string | undefined;
    user?: User;
    approvedUser?: User;
}
