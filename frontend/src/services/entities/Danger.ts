import { Notification } from "./Notification";
import { DangerRequest } from "./request/DangerRequest";
import { DangerMessage } from "./DangerMessage";
import { DangerCategory } from "./DangerCategory";


export interface Danger {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    type?: DangerType;
    description?: string | undefined;
    lat?: number;
    lon?: number;
    addressName?: string | undefined;
    title?: string | undefined;
    categoryId?: string;
    otherCategory?: string | undefined;
    activeAt?: Date | undefined;
    resolvedAt?: Date | undefined;
    readonly isActive?: boolean;
    category?: DangerCategory;
    messages?: DangerMessage[] | undefined;
    requests?: DangerRequest[] | undefined;
    notifications?: Notification[] | undefined;
}

export enum DangerType {
    Permanent = "Permanent",
    Temporary = "Temporary"
}

