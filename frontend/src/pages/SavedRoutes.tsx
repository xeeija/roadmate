import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  RefresherEventDetail,
} from "@ionic/react"
import { FC, useContext, useEffect, useState } from "react"
import SavedRoute from "../components/SavedRoute"
import PlaceholderCard from "../components/PlaceholderCard"
import ToolBar from "../components/navigation/ToolBar"
import { UserContext } from "../components/ProtectedRoute"
import { RouteService } from "../services/api/RouteService"
import { Route } from "../services/entities/Route"

const SavedRoutes: FC = () => {
  const [allRoutes, setAllRoutes] = useState<Route[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const { currentUserToken, currentUser } = useContext(UserContext)

  const routeService = new RouteService()

  const fetchData = async () => {
    setIsLoading(true)
    if (currentUser?.id && currentUserToken) {
      try {
        const allRoutesResponse = await routeService.routeGET2(currentUserToken)
        setAllRoutes(allRoutesResponse?.data)
      } catch (error) {
        console.error("error fetching routes", error)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    void fetchData()
  }, [refreshKey])

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    fetchData()
      .then(() => {
        setTimeout(() => {
          event.detail.complete()
        }, 1000)
      })
      .catch((error) => {
        console.error("Error refreshing data", error)
      })
  }

  return (
    <IonPage>
      <div className="toolbar-container">
        <ToolBar title="Routen" />
      </div>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="saved-routes-list">
          {isLoading ? (
            <IonSpinner />
          ) : allRoutes && allRoutes.length > 0 ? (
            allRoutes.map((route, index) => (
              <SavedRoute
                key={index}
                name={route.name ?? ""}
                id={route.id || ""}
                position={{
                  fromLat: route.fromLat ?? 0,
                  fromLng: route.fromLon ?? 0,
                  toLat: route.toLat ?? 0,
                  toLng: route.toLon ?? 0,
                }}
                setRefreshKey={setRefreshKey}
              />
            ))
          ) : (
            <PlaceholderCard />
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SavedRoutes
