import { DangerCategory } from "../DangerCategory";


export interface DangerCategoryListItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: DangerCategory[] | undefined;
}
