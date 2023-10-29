import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, map, personCircle } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Homescreen from "./pages/Homescreen";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";
import CreateDanger from "./pages/CreateDanger";
import SavedRoutes from "./pages/SavedRoutes";
import Notifications from "./pages/Notifications";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";
import Gefahrenstellen from "./pages/DangerZones";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        {/* animated={false} --> fixes sliding animation bug */}
        <IonRouterOutlet animated={false}>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/reset-password">
            <PasswordReset />
          </Route>
          <Route exact path="/createDanger">
            <CreateDanger />
          </Route>
          <Route exact path="/saved-routes">
            <SavedRoutes />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/reset-password">
        <PasswordReset />
      </Route>
      <Route exact path="/dangerzones">
        <Gefahrenstellen />
      </Route>


          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
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
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon className="menu-icon" aria-hidden="true" icon={personCircle} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>

  </IonApp>
);

export default App;
