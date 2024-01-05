import React, { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import RoutingMachine from "./RoutingMachine"
import "../../pages/Homescreen.css"
import "../routing/RoutingMachine.css"
import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react"
import * as L from "leaflet"
import DATemporary from "../../resources/DATemporary.svg"
import DAPermanent from "../../resources/DAPermanent.svg"
import { warningSharp } from "ionicons/icons"

const Map = () => {
  const [renderMap, setRenderMap] = useState(false)

  useEffect(() => {
    setRenderMap(true)
  })

  const dangerPoints = [
    {
      position: [47.043186, 15.404706],
      description: "Achtung Verkehrsunfall",
      type: "Temporary",
    },
    {
      position: [47.066371, 15.435594],
      description: "Baustelle",
      type: "Temporary",
    },
    {
      position: [47.074918, 15.43019],
      description: "Demo",
      type: "Temporary",
    },
    {
      position: [47.061374, 15.437807],
      description: "Veranstaltung",
      type: "Temporary",
    },
    {
      position: [47.068552, 15.40405],
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

  return (
    <IonPage>
      <IonContent fullscreen>
        {renderMap && (
          <div className="map">
            <MapContainer
              doubleClickZoom={false}
              id="mapId"
              zoom={14}
              center={{ lat: 47.06658740529705, lng: 15.446622566627681 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <RoutingMachine />
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
      <IonButton className="createDangerButton">
        <a href="/createDanger" style={{ color: "white", textDecoration: "none" }}>
          <IonIcon icon={warningSharp} className="createDangerIcon" />
        </a>
      </IonButton>
    </IonPage>
  )
}

export default Map
