import { IonGrid, IonItem } from "@ionic/react"
import { FC } from "react"
import { DangerMessage } from "../services/entities/DangerMessage"
import { Role } from "../services/entities/User"
import { Comment } from "./Comment"

interface Props {
  messages: DangerMessage[]
  // onAnswer?: (message: string, referencedMessageId?: string) => Promise<void>
}

const MessageList: FC<Props> = ({ messages }) => {
  return (
    <IonGrid className="backgroundCard">
      {messages.map((message) => (
        <IonItem key={message.id} style={{ flexDirection: "column" }}>
          <Comment
            key={message.id}
            messageId={message.id ?? "0"}
            username={message.user?.username ?? "User"}
            date={message.createdAt}
            avatar={message.userId ?? ""}
            answers={message.answers}
            isExpert={message.user?.role === Role.Expert}
          >
            {message.message}
          </Comment>
        </IonItem>
      ))}
    </IonGrid>
  )
}

export default MessageList
