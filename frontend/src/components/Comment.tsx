import { IonAvatar, IonButton, IonCol, IonIcon, IonImg, IonRow } from "@ionic/react"
import { arrowRedo, caretDown, caretUp, informationCircle } from "ionicons/icons"
import { FC, ReactNode, useState } from "react"
import { DangerMessage } from "../services/entities/DangerMessage"
import { formatDate } from "../utils/date"

export interface CommentProps {
  username: string
  avatar: string
  date: string | number | Date | undefined
  children: ReactNode
  answers?: DangerMessage[]
}

export const Comment: FC<CommentProps> = ({ username, avatar, date, answers, children }) => {
  const [showMore, setShowMore] = useState(true)

  return (
    <IonRow style={{ marginTop: "0.5rem", width: "100%" }}>
      <IonCol size-md="6" className="fontColors" style={{ display: "flex", alignItems: "center" }}>
        <IonAvatar style={{ width: "24px", height: "24px", marginRight: "10px" }}>
          <IonImg
            src={`https://api.dicebear.com/7.x/personas/svg?seed=${avatar}&scale=120&translateY=0`}
          />
        </IonAvatar>
        <p>{username}</p>
      </IonCol>
      <IonCol
        // size-md="6"
        style={{ display: "flex", justifyContent: "end", alignItems: "center", gap: "4px" }}
      >
        <span style={{ fontSize: "14px" }}>{formatDate(date ?? "")}</span>
        <IonIcon icon={informationCircle} />
        <IonIcon icon={arrowRedo} />
      </IonCol>
      <IonCol size="12" size-sm="3">
        {typeof children === "string" ? <p>{children}</p> : children}
      </IonCol>
      {/* Hier Input und Icons für Antwort hinzufügen */}
      {answers && (
        <IonButton
          fill="clear"
          color="dark"
          size="small"
          onClick={() => setShowMore(!showMore)}
          style={{
            // marginTop: "-0.25rem",
            // marginBottom: showMore ? "0" : "0.25rem",
            marginLeft: "-0.5rem",
          }}
        >
          Antworten
          <IonIcon icon={showMore ? caretUp : caretDown} style={{ marginLeft: "4px" }} />
        </IonButton>
      )}
      {answers && showMore && (
        <div style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
          {answers.map((answer) => (
            <Comment
              key={answer.id}
              username={answer.user?.username ?? "User"}
              date={answer.createdAt}
              avatar={answer.userId ?? ""}
            >
              {answer.message}
            </Comment>
          ))}
        </div>
      )}
    </IonRow>
  )
}
