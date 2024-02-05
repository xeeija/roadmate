import { Danger } from "../Danger"
import { User } from "../User"

export interface DangerResolveRequest {
  id?: string
  createdAt?: Date
  updatedAt?: Date | undefined
  timestamp?: Date
  userId?: string
  dangerId?: string
  user?: User
  danger?: Danger
}
