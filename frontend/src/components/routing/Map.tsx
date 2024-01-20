import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
  ToastOptions,
  useIonToast,
} from "@ionic/react"
import { checkmarkOutline, locationSharp, warningOutline, warningSharp } from "ionicons/icons"
import * as L from "leaflet"
import { FC, useContext, useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import "../../pages/Homescreen.css"
import DAPermanent from "../../resources/DAPermanent.svg"
import DATemporary from "../../resources/DATemporary.svg"
import { RouteService } from "../../services/api/RouteService"
import { RouteRequest } from "../../services/entities/request/RouteRequest"
import DangerAcute from "../DangerAcute"
import { UserContext } from "../ProtectedRoute"

import { DangerService } from "../../services/api/DangerService"
import { Danger } from "../../services/entities/Danger"
import RoutingMachine, { RouteData } from "./RoutingMachine"

interface MapProps {
  route?: { fromLat: number; fromLng: number; toLat: number; toLng: number }
}

const Map: FC<MapProps> = ({ route }) => {
  const [renderMap, setRenderMap] = useState(false)
  const [showDangerAcute, setShowDangerAcute] = useState(false)

  const [addressName, setAddressName] = useState<string>("")
  const [createdAt, setCreatedAt] = useState<Date>(new Date())
  const [isActive, setIsActive] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const { currentUserToken, currentUser } = useContext(UserContext)

  const [dangerPoints, setDangerPoints] = useState<Danger[]>([])

  const dangerService = new DangerService()

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserToken) {
        try {
          const dangerResponse = await dangerService.dangerGET2(currentUserToken)
          setDangerPoints(dangerResponse?.data || [])
        } catch (error) {
          console.error("error fetching dangerpoints", error)
        }
      }
    }

    void fetchData()
  }, [])

  const [isRouteAlertOpen, setIsRouteAlertOpen] = useState(false)
  const [saveRouteData, setSaveRouteData] = useState<RouteData | null>(null)

  const [presentToast, dismissToast] = useIonToast()

  const routeService = new RouteService()

  const toastOptions: ToastOptions = {
    duration: 5000,
    position: "bottom",
    buttons: [{ text: "OK", handler: () => dismissToast() }],
  }

  useEffect(() => {
    setRenderMap(true)
  }, [])

  useEffect(() => {}, [route])

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
    address: string
    createdAt: Date
    isActive: boolean
    title: string
  }> = ({ position, type, description, address, createdAt, isActive, title }) => {
    const icon = type === "Temporary" ? iconTemporary : iconPermanent

    const handleClick = (
      address: string,
      createdAt: Date,
      isActive: boolean,
      title: string,
      description: string
    ) => {
      if (type === "Temporary") {
        // Show DangerAcute component when iconTemporary is clicked
        setShowDangerAcute(true)
        setAddressName(address)
        setCreatedAt(createdAt)
        setIsActive(isActive)
        setTitle(title)
        setDescription(description)
      }
    }

    return (
      <Marker
        position={position}
        icon={icon}
        autoPanOnFocus={true}
        eventHandlers={{
          click: () => handleClick(address, createdAt, isActive, title, description),
        }}
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

  const handleSaveRoute = async (routeData: RouteData) => {
    const routeRequest: RouteRequest = {
      userId: currentUser?.id,
      notificationEnabled: true,
      ...routeData,
    }

    try {
      const response = await routeService.routePOST(currentUserToken ?? "", routeRequest)

      if ((response.errorMessages?.length ?? 0) > 0) {
        await presentToast({
          ...toastOptions,
          message: `Fehler: ${response.errorMessages?.join("\n")}`,
          color: "danger",
          icon: warningOutline,
        })
      }

      setIsRouteAlertOpen(false)

      await presentToast({
        ...toastOptions,
        message: "Route gespeichert",
        color: "success",
        icon: checkmarkOutline,
      })
    } catch (error) {
      // Show an error message
      await presentToast({
        ...toastOptions,
        message: `Fehler: ${(error as Error).message}`,
        color: "danger",
        icon: warningOutline,
      })
      console.error(error)
    }
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
                showRouteAlert={(routeData) => {
                  setIsRouteAlertOpen(true)
                  setSaveRouteData(routeData)
                }}
                show={true}
                isStatic={false}
                waypoints={
                  route && route.fromLat && route.fromLng && route.toLat && route.toLng
                    ? [L.latLng(route.fromLat, route.fromLng), L.latLng(route.toLat, route.toLng)]
                    : []
                }
              />
              <ClickHandler />
              <MarkerClusterGroup chunkedLoading maxClusterRadius={40} showCoverageOnHover={false}>
                {dangerPoints.map((dangerPoint, index) => (
                  <MarkerWithPopup
                    key={index}
                    position={{ lat: dangerPoint.lat ?? 0, lng: dangerPoint.lon ?? 0 }}
                    type={dangerPoint.type ?? ""}
                    description={dangerPoint.description ?? ""}
                    address={dangerPoint.addressName ?? ""}
                    createdAt={dangerPoint.createdAt ?? new Date()}
                    isActive={dangerPoint.isActive ?? false}
                    title={dangerPoint.title ?? ""}
                  />
                ))}
              </MarkerClusterGroup>
            </MapContainer>
            {showDangerAcute && (
              <DangerAcute
                closeModal={() => setShowDangerAcute(false)}
                addressName={addressName}
                createdAt={createdAt}
                isActive={isActive}
                title={title}
                description={description}
              />
            )}
          </div>
        )}
      </IonContent>

      <IonAlert
        className="customAlert"
        header="Neue Route"
        trigger={"saveRoute"}
        message="Gib einen Namen für deine neue Route ein"
        isOpen={isRouteAlertOpen}
        inputs={[
          {
            name: "name",
            placeholder: "Name",
            label: "Name",
          },
        ]}
        buttons={[
          {
            text: "Abbrechen",
            handler: () => {
              setIsRouteAlertOpen(false)
              setSaveRouteData(null)
            },
          },
          {
            text: "Route speichern",
            handler: async (values: { name: string }) => {
              // Route speichern Logik von RoutingMachine

              if (!saveRouteData) {
                await presentToast({
                  ...toastOptions,
                  message: "Route speichern fehlgeschlagen",
                  color: "danger",
                  icon: warningOutline,
                })
                console.error("Route data not set")
                return
              }

              await handleSaveRoute({
                ...saveRouteData,
                name: values.name,
              })
            },
          },
        ]}
      />

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
