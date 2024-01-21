import { IonIcon, IonItem, IonLabel, IonNote, IonText } from "@ionic/react"
import { FC } from "react"

import "./Notification.css"
import DangerAcute from "./DangerAcute";
import { chevronForwardOutline } from "ionicons/icons";

interface NotificationProps {
  date: Date;
  name: string;
  route: string;
  id: number;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const Notification: FC<NotificationProps> = ({ date, name, route, id, showModal, setShowModal  }) => {
  const formattedDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`

  return (
    <IonItem lines="full" id={"notification" + id} button onClick={() => console.log(id)}>
      <IonLabel>
        <IonNote className="notification-time">{formattedDate}</IonNote>
        <br />
        <IonText color="dark">{name}</IonText>
        <br />
        <IonNote className="ion-text-wrap">{route}</IonNote>
      </IonLabel>
      <IonIcon icon={chevronForwardOutline} onClick={() => setShowModal(true)} />
      {showModal && (
        <DangerAcute
          closeModal={() => setShowModal(false)}
          addressName={"Adress"}
          createdAt={new Date(Date.now())}
          isActive={true}
          title={"Title"}
          description={"Description"}
        />
      )}
    </IonItem>
  )
}

export default Notification
