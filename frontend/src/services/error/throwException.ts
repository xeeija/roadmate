import { ApiException } from "./ApiException";

export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;

    else
        throw new ApiException(message, status, response, headers, null);
}
