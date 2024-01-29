import { LocationResult } from "../LocationResult"

export interface LocationResultItemResponseModel {
  readonly hasError?: boolean
  isAuthorized?: boolean
  errorMessages?: string[] | undefined
  data?: LocationResult
}
