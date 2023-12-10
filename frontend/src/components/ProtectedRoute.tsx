import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { useHistory } from "react-router"
import Login from "../pages/Login"
import { UserService } from "../services/api/UserService"
import { AuthService } from "../services/AuthService"
import { User } from "../services/entities/User"

interface ProtectedRouteProps {
  children?: ReactNode
}

interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | undefined) => void
  currentUserToken: string | null
  setCurrentUserToken: (token: string | null) => void
  currentUserRole: string | null
  setCurrentUserRole: (role: string | null) => void
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  currentUserToken: null,
  setCurrentUserToken: () => {},
  currentUserRole: null,
  setCurrentUserRole: () => {},
})

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const authService = new AuthService()
  const userService = new UserService()

  const [currentUser, setCurrentUser] = useState<User>()
  const [currentUserToken, setCurrentUserToken] = useState<string | null>(null)
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null)
  const [isLoaded] = useState<number>(0)

  const history = useHistory()

  useEffect(() => {
    void authService.getUserIdAndTokenAndRoleFromAuthInfoAppStorage().then((values) => {
      //console.log(values)
      const [userId, token, role] = values

      if (userId && token && role) {
        // console.log(token)

        setCurrentUserToken(token)
        setCurrentUserRole(role)

        userService
          .userGET(userId, token)
          .then((response) => {
            const user = response.data
            if (user) {
              setCurrentUser(user)
            } else {
              // console.log("redirect login")
              history.push("/login")
            }
          })
          .catch((err) => {
            console.error("error fetching user", err)
            //setIsLoaded(isLoaded + 1);
            setCurrentUser(undefined)
            setCurrentUserToken(null)
            history.push("/login")
          })
      } else {
        // setIsLoaded(1)
        history.push("/login")
      }
    })
  }, [isLoaded])

  if (currentUser) {
    return (
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          currentUserToken,
          setCurrentUserToken,
          currentUserRole,
          setCurrentUserRole,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  } else {
    return <>{isLoaded !== 0 && <Login />}</>
    // return <>{isLoaded !== 0 && null}</>
  }
}

export default ProtectedRoute
