import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { FC } from "react"
import ExploreContainer from "../components/ExploreContainer"
import "./Tab2.css"

const Tab2: FC = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  )
}

export default Tab2
