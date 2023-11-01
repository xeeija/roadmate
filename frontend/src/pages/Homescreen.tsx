import { IonContent, IonPage } from "@ionic/react"
import * as L from "leaflet"
import "leaflet-routing-machine"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import DAPermanent from "../resources/DAPermanent.svg"
import DATemporary from "../resources/DATemporary.svg"
import "./Homescreen.css"

const dangerPoints = [
  {
    position: [47.06658740529705, 15.446622566627681],
    description: "Achtung Verkehrsunfall",
    type: "Temporary",
  },
  {
    position: [47.066497966340485, 15.43830029261831],
    description: "Baustelle",
    type: "Temporary",
  },
  {
    position: [47.069057535063074, 15.406186824665646],
    description: "Gefährliche Stelle",
    type: "Permanent",
  },
  {
    position: [47.07484396226711, 15.451459913278665],
    description: "Achtung Absturzgefahr",
    type: "Permanent",
  },
  //Diese Gefahrenstellen sollen später aus der Datenbank kommen und im useEffect aufgerufen und befüllt werden
]

const iconTemporary = L.icon({
  iconUrl: DATemporary,
  iconSize: [31, 38],
})

const iconPermanent = L.icon({
  iconUrl: DAPermanent,
  iconSize: [31, 38],
})

const Homescreen: React.FC = () => {
  const [renderMap, setRenderMap] = useState(false)

  useEffect(() => {
    setRenderMap(true)
  })

  return (
    <IonPage>
      <IonContent fullscreen>
        {renderMap && (
          <div id="map">
            <MapContainer
              center={{ lat: 47.06658740529705, lng: 15.446622566627681 }}
              zoom={25}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {dangerPoints.map((dangerPoint, index) => (
                <Marker
                  key={index}
                  position={{ lat: dangerPoint.position[0], lng: dangerPoint.position[1] }}
                  icon={dangerPoint.type === "Temporary" ? iconTemporary : iconPermanent}
                  autoPanOnFocus={true}
                >
                  <Popup>{dangerPoint.description}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Homescreen
