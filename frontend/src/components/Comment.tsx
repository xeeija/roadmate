import { IonAvatar, IonCol, IonGrid, IonIcon, IonImg, IonRow } from "@ionic/react"
import { arrowRedo, informationCircle } from "ionicons/icons"
import { FC } from "react"

interface CommentProps {
  data: Array<{
    avatarSrc: string
    username: string
    date: string
    question: string
  }>
}

const Comment: FC<CommentProps> = ({ data }) => {
  return (
    <IonGrid className="backgroundCard">
      {data.map((item, index) => (
        <IonRow key={index} style={{ marginLeft: "10px" }}>
          <IonCol
            size-md="6"
            className="fontColors"
            style={{ display: "flex", alignItems: "center" }}
          >
            <IonAvatar style={{ width: "25px", height: "25px", marginRight: "10px" }}>
              <IonImg src={item.avatarSrc} />
            </IonAvatar>
            {item.username}
          </IonCol>
          <IonCol className="date-icons" size-md="6">
            <span className="date">{item.date}</span>
            <IonIcon icon={informationCircle} />
            <IonIcon icon={arrowRedo} />
          </IonCol>
          <IonCol size="12" size-sm="3">
            <p>{item.question}</p>
          </IonCol>
          {/* Hier Input und Icons für Antwort hinzufügen */}
        </IonRow>
      ))}
    </IonGrid>
  )
}

export default Comment
