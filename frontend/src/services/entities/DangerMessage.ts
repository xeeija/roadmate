import { Danger } from "./Danger";
import { User } from "./User";


export interface DangerMessage {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    message?: string | undefined;
    userId?: string;
    dangerId?: string;
    referencedMessageId?: string | undefined;
    user?: User;
    danger?: Danger;
    referencedMessage?: DangerMessage;
    answers?: DangerMessage[] | undefined;
}
