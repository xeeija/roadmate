import { IonBackButton, IonButtons, IonHeader, IonToolbar } from "@ionic/react"
import { caretBack } from "ionicons/icons"
import { FC } from "react"
import "./ToolBar.css"

interface ToolbarProps {
  title: string
}

const ToolBar: FC<ToolbarProps> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar className="customToolbar">
        <IonButtons slot="start">
          <IonBackButton
            className="customBackButton"
            defaultHref="/"
            icon={caretBack}
            text={title}
          ></IonBackButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default ToolBar
