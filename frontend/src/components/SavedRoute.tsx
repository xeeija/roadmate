import { IonAlert, IonButton, IonCard, IonCardContent, IonIcon } from "@ionic/react"
import { ellipsisHorizontal } from "ionicons/icons"
import { FC } from "react"

import "./SavedRoute.css"
import StaticMap from "./StaticMap"

interface RouteProps {
  name: string
  id: number
  position: { fromLat: number; fromLng: number; toLat: number; toLng: number }
}

const SavedRoute: FC<RouteProps> = ({ name, id, position }) => {
  return (
    <IonCard className="" color="light">
      <div className="map-container">
        <StaticMap route={position} />
      </div>
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
