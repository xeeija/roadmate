import { DangerType } from "./Danger";


export interface DangerModel {
    type?: DangerType;
    description?: string | undefined;
    lat?: number;
    lon?: number;
    addressName?: string | undefined;
    title?: string | undefined;
    categoryId?: string;
    otherCategory?: string | undefined;
    activeAt?: Date | undefined;
}
