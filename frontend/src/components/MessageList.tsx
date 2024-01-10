import { IonGrid, IonItem } from "@ionic/react"
import { FC } from "react"
import { DangerMessage } from "../services/entities/DangerMessage"
import { Comment } from "./Comment"

interface Props {
  messages: DangerMessage[]
}

const MessageList: FC<Props> = ({ messages }) => {
  return (
    <IonGrid className="backgroundCard">
      {messages.map((message) => (
        <IonItem key={message.id} style={{ flexDirection: "column" }}>
          <Comment
            key={message.id}
            username={message.user?.username ?? "User"}
            date={message.createdAt}
            avatar={message.userId ?? ""}
            answers={message.answers}
          >
            {message.message}
          </Comment>
        </IonItem>
      ))}
    </IonGrid>
  )
}

export default MessageList
