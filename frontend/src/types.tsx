import { JwtPayload } from "jwt-decode"

export type JwtToken = JwtPayload & {
  nameid?: string | null
  email?: string | null
  role?: string | null
}
