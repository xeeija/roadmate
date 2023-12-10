import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react"

import DangerAcute from "../components/DangerAcute"
import Notification from "../components/Notification"
import ToolBar from "../components/navigation/ToolBar"

import { FC, useState } from "react"
import "./Notifications.css"

const Notifications: FC = () => {
  //The following code is for the AcuteDanger modal
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <IonPage>
      <IonContent>
        <div className="toolbar-container">
          <ToolBar title="Karte" />
        </div>

        <IonCard className="rounded-modal">
          <IonCardHeader>
            <IonText className="notifications-title">Benachrichtigungen</IonText>
          </IonCardHeader>

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
                id={3}
              />
              <Notification
                name="Unfall 4 gemeldet"
                date={new Date("2023-10-21T17:11:00")}
                route="Arbeitsweg"
                id={4}
              />
              <Notification
                name="Unfall 5 gemeldet"
                date={new Date("2023-10-21T17:11:00")}
                route="Arbeitsweg"
                id={5}
              />
              <Notification
                name="Unfall 6 gemeldet"
                date={new Date("2023-10-21T17:11:00")}
                route="Arbeitsweg"
                id={6}
              />
              <Notification
                name="Unfall 7 gemeldet"
                date={new Date("2023-10-21T17:11:00")}
                route="Arbeitsweg"
                id={7}
              />
              <Notification
                name="Unfall 8 gemeldet"
                date={new Date("2023-10-21T17:11:00")}
                route="Arbeitsweg"
                id={8}
              />
              <Notification
                name="Unfall 9 gemeldet"
                date={new Date("2023-10-21T17:11:00")}
                route="Arbeitsweg"
                id={9}
              />
              <Notification
                name="Unfall 10 gemeldet"
                date={new Date("2023-10-21T17:11:00")}
                route="Arbeitsweg"
                id={10}
              />
              {/* Test DangerAcute Component */}
              <IonButton onClick={openModal}>Akute Gefahrenstelle öffnen</IonButton>
              {showModal && <DangerAcute closeModal={closeModal} />}
            </IonList>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Notifications
