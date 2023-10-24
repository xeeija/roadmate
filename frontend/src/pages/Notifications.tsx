import {
  IonAlert,
  IonButton,
  IonCard,
  IonContent,
  IonPage,
  IonText,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonList,
} from "@ionic/react";

import ToolBar from "../components/navigation/ToolBar";
import Notification from "../components/Notification";

import "./Notifications.css";

const Notifications: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="toolbar-container">
          <ToolBar title="Karte" backButton={true} />
        </div>

        <IonCard color="light">
          <IonCardHeader>
            <IonText className="notifications-title">Benachrichtigungen</IonText>
          </IonCardHeader>

          <div className="notifications-list">
            <IonList style={{ color: "white" }}>
              <Notification name="Unfall 1 gemeldet" date={new Date("2023-10-21T14:52:00")} route="Arbeitsweg" id={1} />
              <Notification name="Unfall 2 gemeldet" date={new Date("2023-10-21T17:11:00")} route="Arbeitsweg" id={2} />
            </IonList>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
