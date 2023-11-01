import React from "react"
import { IonAlert, IonButton, IonCard, IonCardContent, IonIcon } from "@ionic/react"
import { ellipsisHorizontal } from "ionicons/icons"

import "./SavedRoute.css"

interface RouteProps {
  name: string
  id: number
}

const SavedRoute: React.FC<RouteProps> = ({ name, id }) => {
  return (
    <IonCard className="" color="light">
      <img
        alt="Picture"
        className="route-picture"
        src="https://ionicframework.com/docs/img/demos/card-media.png"
      />

      <IonCardContent className="content-container">
        <div className="route-title">{name}</div>
        <div className="route-action">
          {/*TODO: Button needs an identifier */}
          <IonButton fill="clear" slot="end" id={"openMenu" + id} size="small">
            <IonAlert
              header="Aktion auswählen"
              trigger={"openMenu" + id}
              buttons={[
                {
                  text: "Route bearbeiten",
                  handler: () => {
                    console.log("Route " + id + " bearbeiten")
                  },
                },
                {
                  text: "Route löschen",
                  handler: () => {
                    console.log("Route " + id + " löschen")
                  },
                },
              ]}
            ></IonAlert>
            <IonIcon slot="start" icon={ellipsisHorizontal} color="medium"></IonIcon>
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default SavedRoute
