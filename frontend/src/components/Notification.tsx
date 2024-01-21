import { IonIcon, IonItem, IonLabel, IonNote, IonText } from "@ionic/react"
import { FC, useState } from "react"

import "./Notification.css"
import DangerAcute from "./DangerAcute";
import { chevronForwardOutline } from "ionicons/icons";

interface NotificationProps {
  date: Date;
  name: string;
  route?: string;
  
}

const Notification: FC<NotificationProps> = ({ date, name, route  }) => {
  const formattedDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`
  const [showModal, setShowModal] = useState(false)
  return (
    <IonItem lines="full" button detail={false} onClick={() => setShowModal(true)} >
      <IonLabel>
        <IonNote className="notification-time">{formattedDate}</IonNote>
        <br />
        <IonText color="dark">{name}</IonText>
        <br />
        <IonNote className="ion-text-wrap">{route}</IonNote>
      </IonLabel>
      <IonIcon icon={chevronForwardOutline} />
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
