import { DangerCategory } from "../DangerCategory";


export interface DangerCategoryItemResponseModel {
    readonly hasError?: boolean;
    isAuthorized?: boolean;
    errorMessages?: string[] | undefined;
    data?: DangerCategory;
}
