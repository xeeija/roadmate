import { IonContent, IonPage } from "@ionic/react"
import { FC, useContext, useEffect, useState } from "react"
import SavedRoute from "../components/SavedRoute"
import ToolBar from "../components/navigation/ToolBar"
import { UserContext } from "../components/ProtectedRoute"
import { RouteService } from "../services/api/RouteService"
import { Route } from "../services/entities/Route"

const SavedRoutes: FC = () => {
  const [allRoutes, setAllRoutes] = useState<Route[]>()
  const { currentUserToken, currentUser } = useContext(UserContext)

  const routeService = new RouteService()

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.id && currentUserToken) {
        try {
          const allRoutesResponse = await routeService.routeGET2(currentUserToken)
          setAllRoutes(allRoutesResponse?.data)
        } catch (error) {
          console.error("error fetching routes", error)
        }
      }
    }

    void fetchData()
  }, [])

  return (
    <IonPage>
      <IonContent>
        <div className="toolbar-container">
          <ToolBar title="Routen" />
        </div>

        <div className="saved-routes-list">
          {allRoutes?.map((route, index) => (
            <SavedRoute
              key={index}
              name={route.name ?? ""}
                id={parseInt(route.id || "")}
              position={{
                fromLat: route.fromLat ?? 0,
                fromLng: route.fromLon ?? 0,
                toLat: route.toLat ?? 0,
                toLng: route.toLon ?? 0,
              }}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SavedRoutes
