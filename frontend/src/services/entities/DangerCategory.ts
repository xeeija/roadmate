import { Danger } from "./Danger";


export interface DangerCategory {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date | undefined;
    name?: string | undefined;
    dangers?: Danger[] | undefined;
}
