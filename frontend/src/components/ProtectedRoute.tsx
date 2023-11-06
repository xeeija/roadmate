import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import React from 'react';
import { AuthService } from '../services/AuthService';
import { useHistory } from 'react-router-dom';
import { User } from '../services/entities/User';
import { UserService } from '../services/api/UserService';
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;
import Login from '../pages/Login';
import Profil from '../pages/Profil';


interface ProtectedRouteProps {
  children?: ReactNode;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  currentUserToken: string;
  setCurrentUserToken: (token: string) => void;
  currentUserRole: string;
  setCurrentUserRole: (role: string) => void;
}

export const UserContext = createContext<UserContextType>({
  currentUser: {},
  setCurrentUser: (user: User) => {},
  currentUserToken: '',
  setCurrentUserToken: (token: string) => '',
  currentUserRole: '',
  setCurrentUserRole: (role: string) => ''
});

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const history = useHistory();

  const authService = new AuthService("http://localhost:5211");
  const userService = new UserService("http://localhost:5211");

  const [currentUser, setCurrentUser] = useState<User>();
  const [currentUserToken, setCurrentUserToken] = useState<string>('');
  const [currentUserRole, setCurrentUserRole] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<number>(0);

  useEffect(() => {
    authService.getUserIdAndTokenAndRoleFromAuthInfoAppStorage().then((values: any) => {
      //console.log(values)
      if (JSON.stringify(values) !== JSON.stringify([null, null, null])) {
        const userId = values[0];
        //console.log(userId)
        const token: any = values[1];
        const role: any = values[2];
        console.log(token)

        setCurrentUserToken(token);
        setCurrentUserRole(role);
        /*userService
          .userGET(userId, token)
          .then(response => {
            const user = response.data;
            if (user) {
              setCurrentUser(user);
            }
          })
          .catch((error: any) => {
            //console.log('Ein Fehler ist aufgetreten.');
            setIsLoaded(isLoaded + 1);
            setCurrentUser({});
            setCurrentUserToken('');
          });*/
      } else {
        setIsLoaded(isLoaded + 1);
      }
    });
  }, [isLoaded]);

  if (currentUser) {
    return (
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          currentUserToken,
          setCurrentUserToken,
          currentUserRole,
          setCurrentUserRole
        }}>
        {children}
      </UserContext.Provider>
    );
  } else {
    //HIER NOCH AUF LOGIN ÄNDERN!!!!
    return <>{isLoaded !== 0 && <Profil />}</>;
  }
};
export default ProtectedRoute;
