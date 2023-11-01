import React from "react"
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from "@ionic/react"
import "./ToolBar.css"
import { caretBack } from "ionicons/icons"

interface ToolbarProps {
  title: string
}

const ToolBar: React.FC<ToolbarProps> = ({ title }) => {
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
