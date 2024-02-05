import { DangerResolveRequest } from "../request/DangerResolveRequest"

export interface DangerResolveRequestItemResponseModel {
  readonly hasError?: boolean
  isAuthorized?: boolean
  errorMessages?: string[] | undefined
  data?: DangerResolveRequest
}
