import { Danger } from "./Danger";


export interface DangerMessage {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    message?: string | undefined;
    dangerId?: string;
    referencedMessageId?: string | undefined;
    danger?: Danger;
    referencedMessage?: DangerMessage;
    answers?: DangerMessage[] | undefined;
}
