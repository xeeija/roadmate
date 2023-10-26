import { Danger } from "../Danger";
import { User } from "../User";


export interface DangerRequest {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    type?: RequestType;
    timestamp?: Date;
    userId?: string;
    dangerId?: string;
    user?: User;
    danger?: Danger;
}

export enum RequestType {
    Create = "Create",
    Resolve = "Resolve"
}

