import React, { FC, useContext, useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import { IonButton, IonContent, IonIcon, IonPage, IonText } from "@ionic/react"
import RoutingMachine from "./RoutingMachine"
import "../../pages/Homescreen.css"
import "../routing/RoutingMachine.css"
import * as L from "leaflet"
import DATemporary from "../../resources/DATemporary.svg"
import DAPermanent from "../../resources/DAPermanent.svg"
import { locationSharp, warningSharp } from "ionicons/icons"
import DangerAcute from "../DangerAcute"
import { UserContext } from "../ProtectedRoute"

interface DangerPoint {
  position: [number, number]
  description: string
  type: "Temporary" | "Permanent"
}

interface MapProps {
  route?: { fromLat: number; fromLng: number; toLat: number; toLng: number }
}

const Map: FC<MapProps> = ({ route }) => {
  const [renderMap, setRenderMap] = useState(false)
  const [showDangerAcute, setShowDangerAcute] = useState(false)

  const { currentUserToken, currentUser } = useContext(UserContext)

  useEffect(() => {
    setRenderMap(true)
  }, [])

  useEffect(() => {}, [route])

  const dangerPoints: DangerPoint[] = [
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
  ]

  const iconTemporary = L.icon({
    iconUrl: DATemporary,
    iconSize: [31, 38],
  })

  const iconPermanent = L.icon({
    iconUrl: DAPermanent,
    iconSize: [31, 38],
  })

  const CustomPopup: FC<{ description: string }> = ({ description }) => {
    return (
      <Popup>
        <div>{description}</div>
      </Popup>
    )
  }

  const MarkerWithPopup: FC<{
    position: { lat: number; lng: number }
    type: string
    description: string
  }> = ({ position, type, description }) => {
    const icon = type === "Temporary" ? iconTemporary : iconPermanent

    const handleClick = () => {
      if (type === "Temporary") {
        // Show DangerAcute component when iconTemporary is clicked
        setShowDangerAcute(true)
      }
    }

    return (
      <Marker
        position={position}
        icon={icon}
        autoPanOnFocus={true}
        eventHandlers={{ click: handleClick }}
      >
        <CustomPopup description={description} />
      </Marker>
    )
  }

  const ClickHandler: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = useMapEvents({
      click: () => {
        // what happens when map is clicked
        console.log("Map clicked")
      },
    })

    return null
  }

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
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <RoutingMachine
                key={JSON.stringify(route)}
                userId={currentUser?.id ?? ""}
                userToken={currentUserToken ?? ""}
                show={true}
                waypoints={
                  route && route.fromLat && route.fromLng && route.toLat && route.toLng
                    ? [L.latLng(route.fromLat, route.fromLng), L.latLng(route.toLat, route.toLng)]
                    : []
                }
              />
              <ClickHandler />

              {dangerPoints.map((dangerPoint, index) => (
                <MarkerWithPopup
                  key={index}
                  position={{ lat: dangerPoint.position[0], lng: dangerPoint.position[1] }}
                  type={dangerPoint.type}
                  description={dangerPoint.description}
                />
              ))}
            </MapContainer>
            {showDangerAcute && <DangerAcute closeModal={() => setShowDangerAcute(false)} />}
          </div>
        )}
      </IonContent>
      <IonButton className="createDangerButton">
        <a href="/createDanger" style={{ color: "white", textDecoration: "none" }}>
          <IonIcon icon={warningSharp} className="createDangerIcon" />
        </a>
      </IonButton>
      <div className="legend">
        <IonIcon icon={locationSharp} className="akutIcon" />
        <IonText className="legend-text">Akute Gefahrenstelle</IonText>
        <IonIcon icon={locationSharp} className="permanentIcon" />
        <IonText className="legend-text2">Permanente Gefahrenstelle</IonText>
      </div>
    </IonPage>
  )
}

export default Map
