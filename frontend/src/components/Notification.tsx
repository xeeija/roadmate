import { IonIcon, IonItem, IonLabel, IonNote, IonText } from "@ionic/react"
import { FC, useState } from "react"

import { chevronForwardOutline } from "ionicons/icons"
import DangerAcute from "./DangerAcute"
import "./Notification.css"

interface NotificationProps {
  title: string
  description: string
  address: string
  date: Date
  isActive: boolean
  routeName?: string
}

const Notification: FC<NotificationProps> = ({
  title,
  address,
  date,
  routeName,
  isActive,
  description,
}) => {
  const formattedDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`

  const [showModal, setShowModal] = useState(false)
  const [showDangerAcute, setShowDangerAcute] = useState(false)

  return (
    <>
      <IonItem lines="full" button detail={false} onClick={() => setShowDangerAcute(true)}>
        {/* {JSON.stringify(showModal)} */}
        <IonLabel>
          <IonNote className="notification-time">{formattedDate}</IonNote>
          <br />
          <IonText color="dark">{title}</IonText>
          <br />
          <IonNote className="ion-text-wrap">{routeName}</IonNote>
        </IonLabel>
        <IonIcon icon={chevronForwardOutline} />
        {/* {showModal && ( */}

        {/* )} */}
      </IonItem>
      <DangerAcute
        closeModal={() => setShowDangerAcute(false)}
        // closeModal={() => setShowModal(false)}
        addressName={address}
        createdAt={date}
        isActive={isActive}
        title=""
        description={description}
        isOpen={showDangerAcute}
      />
    </>
  )
}

export default Notification
