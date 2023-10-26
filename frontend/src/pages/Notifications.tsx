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
          <ToolBar title="Karte" />
        </div>

        <div className="rounded-modal">
          <IonText className="notifications-title">Benachrichtigungen</IonText>

          <IonCard>
            <div className="notifications-list">
              <IonList style={{ color: "white" }}>
                <Notification
                  name="Unfall 1 gemeldet"
                  date={new Date("2023-10-21T14:52:00")}
                  route="Arbeitsweg"
                  id={1}
                />
                <Notification
                  name="Unfall 2 gemeldet"
                  date={new Date("2023-10-21T17:11:00")}
                  route="Arbeitsweg"
                  id={2}
                />
                {/* Add more notifications here */}
                <Notification
                  name="Unfall 3 gemeldet"
                  date={new Date("2023-10-21T17:11:00")}
                  route="Arbeitsweg"
                  id={2}
                />
                <Notification
                  name="Unfall 4 gemeldet"
                  date={new Date("2023-10-21T17:11:00")}
                  route="Arbeitsweg"
                  id={2}
                />
                <Notification
                  name="Unfall 5 gemeldet"
                  date={new Date("2023-10-21T17:11:00")}
                  route="Arbeitsweg"
                  id={2}
                />
                <Notification
                  name="Unfall 6 gemeldet"
                  date={new Date("2023-10-21T17:11:00")}
                  route="Arbeitsweg"
                  id={2}
                />
                <Notification
                  name="Unfall 7 gemeldet"
                  date={new Date("2023-10-21T17:11:00")}
                  route="Arbeitsweg"
                  id={2}
                />
                <Notification
                  name="Unfall 8 gemeldet"
                  date={new Date("2023-10-21T17:11:00")}
                  route="Arbeitsweg"
                  id={2}
                />
                <Notification
                  name="Unfall 9 gemeldet"
                  date={new Date("2023-10-21T17:11:00")}
                  route="Arbeitsweg"
                  id={2}
                />
              </IonList>
            </div>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
