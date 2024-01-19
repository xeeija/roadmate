import { IonAlert, IonButton, IonCard, IonCardContent, IonIcon, ToastOptions } from "@ionic/react"
import { checkmarkOutline, ellipsisHorizontal, warningOutline } from "ionicons/icons"
import { FC, useContext } from "react"

import "./SavedRoute.css"
import StaticMap from "./StaticMap"
import { UserContext } from "./ProtectedRoute"
import { RouteService } from "../services/api/RouteService"
import { dismissToast, presentToast } from "../utils/toastUtils"

interface RouteProps {
  name: string
  id: string
  position: { fromLat: number; fromLng: number; toLat: number; toLng: number }
  setRefreshKey: (value: number) => void
}

const SavedRoute: FC<RouteProps> = ({ name, id, position, setRefreshKey }) => {
  const { currentUserToken } = useContext(UserContext)

  const routeService = new RouteService()

  const toastOptions: ToastOptions = {
    duration: 5000,
    position: "bottom",
    buttons: [{ text: "OK", handler: () => dismissToast() }],
  }

  return (
    <IonCard className="cardcolor">
      <div className="map-container">
        <StaticMap route={position} />
      </div>
      <IonCardContent className="content-container">
        <div className="route-title">{name}</div>
        <div className="route-action">
          {/*TODO: Button needs an identifier */}
          <IonButton fill="clear" slot="end" id={"openMenu" + id} size="small">
            <IonAlert className="cardcolor"
              header="Aktion auswählen"
              trigger={"openMenu" + id}
              buttons={[
                // {
                //   text: "Route bearbeiten",
                //   handler: () => {
                //     console.log("Route " + id + " bearbeiten")
                //   },
                // },
                {
                  text: "Route löschen",
                  handler: async () => {
                    if (!currentUserToken) {
                      presentToast({
                        ...toastOptions,
                        message: "Du bist nicht eingeloggt",
                        color: "danger",
                        icon: warningOutline,
                      })
                      return
                    }

                    try {
                      await routeService.routeDELETE(currentUserToken, id)
                      presentToast({
                        ...toastOptions,
                        message: "Route gelöscht",
                        color: "success",
                        icon: checkmarkOutline,
                      })
                      setRefreshKey(Date.now())
                    } catch (error) {
                      presentToast({
                        ...toastOptions,
                        message: `Fehler: ${(error as Error).message}`,
                        color: "danger",
                        icon: warningOutline,
                      })
                      console.error(error)
                    }
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
