import { useContext, useEffect, useState } from "react"
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet"
import "./StaticMap.css"
import RoutingMachine from "./routing/RoutingMachine"
import { UserContext } from "./ProtectedRoute"
import * as L from "leaflet"
import { useHistory } from "react-router"

const StaticMap = ({
  route,
}: {
  route: { fromLat: number; fromLng: number; toLat: number; toLng: number }
}) => {
  const [renderMap, setRenderMap] = useState(false)
  const { currentUserToken, currentUser } = useContext(UserContext)

  const history = useHistory()

  function MapClick() {
    useMapEvents({
      click: () => {
        history.push({
          pathname: "/homescreen",
          state: { route: route },
        })
      },
    })
    return null
  }

  useEffect(() => {
    setRenderMap(true)
  }, [])

  return (
    <div>
      {renderMap && (
        <div className="staticmap">
          <MapContainer
            center={[route.fromLat, route.fromLng]}
            zoom={14}
            style={{ height: "150px", width: "100%" }}
            zoomControl={false}
            attributionControl={false}
            boxZoom={false}
            doubleClickZoom={false}
            dragging={false}
            scrollWheelZoom={false}
            touchZoom={false}
          >
            <MapClick />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <RoutingMachine
              userId={currentUser?.id ?? ""}
              userToken={currentUserToken ?? ""}
              show={false}
              isStatic={true}
              waypoints={[
                L.latLng(route.fromLat, route.fromLng),
                L.latLng(route.toLat, route.toLng),
              ]}
            />
          </MapContainer>
        </div>
      )}
    </div>
  )
}

export default StaticMap
