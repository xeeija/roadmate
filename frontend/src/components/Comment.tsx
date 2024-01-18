import { IonAvatar, IonButton, IonCol, IonIcon, IonImg, IonRow, IonText } from "@ionic/react"
import { arrowRedo, caretDown, caretUp, send } from "ionicons/icons"
import { FC, ReactNode, useState } from "react"
import { DangerMessage } from "../services/entities/DangerMessage"
import { formatDate } from "../utils/date"
import "./Comment.css"
import { Input } from "./Input"

export interface CommentProps {
  username: string
  avatar: string
  date: string | number | Date | undefined
  children: ReactNode
  answers?: DangerMessage[]
  messageId: string
  // onAnswer?: (message: string, referencedMessageId?: string) => Promise<void>
  disableAnswer?: boolean
}

export const Comment: FC<CommentProps> = ({
  username,
  avatar,
  date,
  answers,
  children,
  messageId,
  disableAnswer,
}) => {
  const [showMore, setShowMore] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const AnswerInput = (
    <Input name="answer" label="Antworten...">
      <IonButton
        type="submit"
        id={`submit-${messageId}`}
        fill="clear"
        aria-label="Send"
        onClick={() => {
          setShowAnswer(false)
        }}
      >
        <IonIcon slot="icon-only" icon={send} color="tertiary" size="small" aria-hidden="true" />
      </IonButton>
    </Input>
  )

  return (
    <IonRow style={{ marginTop: "0.5rem", width: "100%" }}>
      <IonCol size-md="6" style={{ display: "flex", alignItems: "center" }}>
        <IonAvatar style={{ width: "24px", height: "24px", marginRight: "10px" }}>
          <IonImg
            src={`https://api.dicebear.com/7.x/personas/svg?seed=${avatar}&scale=120&translateY=0`}
          />
        </IonAvatar>

        <IonText color="tertiary">
          <p>{username}</p>
        </IonText>
      </IonCol>

      <IonCol
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {!disableAnswer && (
          <IonButton fill="clear" color="tertiary" onClick={() => setShowAnswer((x) => !x)}>
            <IonIcon icon={arrowRedo} />
          </IonButton>
        )}

        <IonText color="medium">
          <span style={{ fontSize: "14px" }}>{formatDate(date ?? "")}</span>
        </IonText>
      </IonCol>

      <IonCol size="12" size-sm="3">
        {typeof children === "string" ? <p>{children}</p> : children}
      </IonCol>
      {/* Hier Input und Icons für Antwort hinzufügen */}
      {answers && (
        <IonButton
          fill="clear"
          color="tertiary"
          size="small"
          onClick={() => {
            if (showMore) {
              setShowAnswer(false)
            }

            setShowMore((x) => !x)
          }}
          style={{
            marginLeft: "-0.5rem",
            fontSize: "14px",
          }}
        >
          Antworten
          <IonIcon icon={showMore ? caretUp : caretDown} style={{ marginLeft: "4px" }} />
        </IonButton>
      )}
      {answers && showMore && (
        <div
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          {showAnswer && AnswerInput}

          {answers.map((answer) => (
            <Comment
              key={answer.id}
              username={answer.user?.username ?? "User"}
              date={answer.createdAt}
              avatar={answer.userId ?? ""}
              disableAnswer
              messageId={answer.id ?? ""}
            >
              {answer.message}
            </Comment>
          ))}
        </div>
      )}
      {!showMore && showAnswer && AnswerInput}
    </IonRow>
  )
}
