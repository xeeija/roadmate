import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { home, map, personCircle } from "ionicons/icons"
import { FC } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateDanger from "./pages/CreateDanger"
import DangerZones from "./pages/DangerZones"
import Homescreen from "./pages/Homescreen"
import Login from "./pages/Login"
import Notifications from "./pages/Notifications"
import PasswordReset from "./pages/PasswordReset"
import Profil from "./pages/Profil"
import Register from "./pages/Register"
import SavedRoutes from "./pages/SavedRoutes"
import Tab2 from "./pages/Tab2"
import { ToastProvider } from "./utils/toastUtils"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/padding.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"

/* Theme variables */
import CreateDangerTest from "./pages/CreateDangerTest"
import "./theme/global.css"
import "./theme/variables.css"

setupIonicReact()

const App: FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* Switch helps not to display the Taskbar (IonTabBar) in Login, Register and PasswordReset */}
      <Switch>
        <Route exact path={["/login", "/register", "/reset-password"]}>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/reset-password" component={PasswordReset} />
          </IonRouterOutlet>
        </Route>

        {/* Part of the App, where the Taskbar gets displayed */}
        <ProtectedRoute>
          <ToastProvider>
            <Route path="/">
              <IonTabs>
                {/* animated={false} --> fixes sliding animation bug */}
                <IonRouterOutlet animated={false}>
                  <Route exact path="/createDanger">
                    <CreateDanger />
                  </Route>

                  <Route exact path="/createDangerTest">
                    <CreateDangerTest />
                  </Route>

                  <Route exact path="/createDangerTest">
                    <CreateDangerTest />
                  </Route>

                  <Route exact path="/saved-routes">
                    <SavedRoutes />
                  </Route>
                  <Route exact path="/notifications">
                    <Notifications />
                  </Route>
                  <Route exact path="/dangerzones/:dangerId">
                    <DangerZones />
                  </Route>
                  <Route exact path="/homescreen">
                    <Homescreen />
                  </Route>
                  <Route exact path="/tab2">
                    <Tab2 />
                  </Route>
                  <Route path="/profil">
                    <Profil />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/homescreen" />
                  </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/homescreen">
                    <IonIcon className="menu-icon" aria-hidden="true" icon={home} />
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/saved-routes">
                    <IonIcon className="menu-icon" aria-hidden="true" icon={map} />
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/profil">
                    <IonIcon className="menu-icon" aria-hidden="true" icon={personCircle} />
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </Route>
          </ToastProvider>
        </ProtectedRoute>
      </Switch>
    </IonReactRouter>
  </IonApp>
)

export default App
