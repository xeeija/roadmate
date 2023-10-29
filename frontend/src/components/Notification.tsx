import React from "react";
import { IonItem, IonLabel, IonNote, IonText } from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";

import "./Notification.css";

interface NotificationProps {
  date: Date;
  name: string;
  route: string;
  id: number;
}

const Notification: React.FC<NotificationProps> = ({ date, name, route, id }) => {
  const formattedDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;

  return (
    <IonItem lines="full" id={"notification" + id} button onClick={() => console.log(id)}>
      <IonLabel>
        <IonNote className="notification-time">{formattedDate}</IonNote>
        <br />
        <IonText color="dark">{name}</IonText>
        <br />
        <IonNote className="ion-text-wrap">{route}</IonNote>
      </IonLabel>
    </IonItem>
  );
};

export default Notification;
