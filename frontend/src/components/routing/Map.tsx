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
import { point as turfPoint } from "@turf/helpers"
import { booleanPointInPolygon, buffer, lineString } from "@turf/turf"
import { checkmarkOutline, locationSharp, warningOutline, warningSharp } from "ionicons/icons"
import { LatLng, icon, latLng } from "leaflet"
import { FC, useContext, useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { useHistory } from "react-router-dom"
import "../../pages/Homescreen.css"
import DAOnRoute from "../../resources/DAOnRoute.svg"
import DAPermanent from "../../resources/DAPermanent.svg"
import DATemporary from "../../resources/DATemporary.svg"
import { DangerRequestService } from "../../services/api/DangerRequestService"
import { DangerService } from "../../services/api/DangerService"
import { RouteService } from "../../services/api/RouteService"
import { Danger, DangerType } from "../../services/entities/Danger"
import { RouteRequest } from "../../services/entities/request/RouteRequest"
import DangerAcute from "../DangerAcute"
import { UserContext } from "../ProtectedRoute"
import RoutingMachine, { RouteData } from "./RoutingMachine"

interface MapProps {
  route?: { fromLat: number; fromLng: number; toLat: number; toLng: number }
  renderCount: number
}

interface DangerWithRouteInfo extends Danger {
  isCloseToRoute?: boolean
}

const Map: FC<MapProps> = ({ route, renderCount }) => {
  const [renderMap, setRenderMap] = useState(false)
  const [showDangerAcute, setShowDangerAcute] = useState(false)

  const [addressName, setAddressName] = useState<string>("")
  const [createdAt, setCreatedAt] = useState<Date>(new Date())
  const [isActive, setIsActive] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [id, setId] = useState<string>("")

  const { currentUserToken, currentUser } = useContext(UserContext)
  const dangerRequestService = new DangerRequestService()

  const [dangerPoints, setDangerPoints] = useState<DangerWithRouteInfo[]>([])
  const [routeCoords, setRouteCoords] = useState<LatLng[][]>([])

  useEffect(() => {
    if (routeCoords.length > 0) {
      const routeCoordinates = routeCoords[0].map((point) => [point.lng, point.lat])
      const line = lineString(routeCoordinates)
      const buffered = buffer(line, 10, { units: "meters" }) // Adjust buffer size as needed

      const newDangerPoints = dangerPoints.map((dangerPoint) => {
        const point = turfPoint([dangerPoint.lon ?? 0, dangerPoint.lat ?? 0])
        return {
          ...dangerPoint,
          isCloseToRoute: booleanPointInPolygon(point, buffered),
        }
      })

      setDangerPoints(newDangerPoints)
    }
  }, [routeCoords])

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
  }, [renderCount])

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

  const CustomPopup: FC<{ description: string }> = ({ description }) => {
    return (
      <Popup>
        <div>{description}</div>
      </Popup>
    )
  }

  const MarkerWithPopup: FC<DangerWithRouteInfo> = (dangerPoint) => {
    const {
      id,
      lat,
      lon,
      type,
      description,
      addressName,
      createdAt,
      isActive,
      title,
      isCloseToRoute,
    } = dangerPoint

    const history = useHistory()
    const dangerIcon =
      type === DangerType.Temporary
        ? icon({
            iconUrl: isCloseToRoute ? DAOnRoute : DATemporary,
            iconSize: [32, 38],
            iconAnchor: [16, 38],
          })
        : icon({
            iconUrl: isCloseToRoute ? DAOnRoute : DAPermanent,
            iconSize: [32, 38],
            iconAnchor: [16, 38],
          })

    const handleClick = (
      id: string,
      address: string,
      createdAt: Date,
      isActive: boolean,
      title: string,
      description: string
    ) => {
      if (type === DangerType.Temporary) {
        // Show DangerAcute component when iconTemporary is clicked
        setAddressName(address)
        setCreatedAt(createdAt)
        setIsActive(isActive)
        setTitle(title)
        setDescription(description)
        setShowDangerAcute(true)
        setId(id)
      } else {
        // Navigate to dangerzone with id
        history.push(`/dangerzones/${id}`)
      }
    }

    return (
      <Marker
        position={{ lat: lat ?? 0, lng: lon ?? 0 }}
        icon={dangerIcon}
        autoPanOnFocus={true}
        eventHandlers={{
          click: () =>
            handleClick(
              id ?? "",
              addressName ?? "",
              createdAt ?? new Date(),
              isActive ?? false,
              title ?? "",
              description ?? ""
            ),
        }}
      >
        <CustomPopup description={description ?? ""} />
      </Marker>
    )
  }

  const ClickHandler: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = useMapEvents({
      click: () => {
        // what happens when map is clicked
        console.log(routeCoords)
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

  const handleRoutesFound = (coords: LatLng[][]) => {
    setRouteCoords(coords)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {renderMap && (
          <div className="map">
            <MapContainer
              doubleClickZoom={false}
              id="mapId"
              zoom={13}
              center={{ lat: 47.06658740529705, lng: 15.446622566627681 }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
                onRoutesFound={handleRoutesFound}
                show={true}
                isStatic={false}
                waypoints={
                  route && route.fromLat && route.fromLng && route.toLat && route.toLng
                    ? [latLng(route.fromLat, route.fromLng), latLng(route.toLat, route.toLng)]
                    : []
                }
              />
              <ClickHandler />
              <MarkerClusterGroup chunkedLoading maxClusterRadius={40} showCoverageOnHover={false}>
                {dangerPoints.map((dangerPoint, index) => (
                  <MarkerWithPopup
                    key={index}
                    id={dangerPoint.id || ""}
                    lat={dangerPoint.lat ?? 0}
                    lon={dangerPoint.lon ?? 0}
                    type={dangerPoint.type ?? DangerType.Temporary}
                    description={dangerPoint.description ?? ""}
                    addressName={dangerPoint.addressName ?? ""}
                    createdAt={dangerPoint.createdAt ?? new Date()}
                    isActive={dangerPoint.isActive ?? false}
                    title={dangerPoint.title ?? ""}
                    isCloseToRoute={dangerPoint.isCloseToRoute}
                  />
                ))}
              </MarkerClusterGroup>
            </MapContainer>
            {/* {showDangerAcute && ( */}
            <DangerAcute
              closeModal={() => setShowDangerAcute(false)}
              addressName={addressName}
              createdAt={createdAt}
              isActive={isActive}
              title={title}
              description={description}
              isOpen={showDangerAcute}
              onResolve={async () => {
                try {
                  const response = await dangerRequestService.resolve(currentUserToken ?? "", {
                    dangerId: id,
                    userId: currentUser?.id ?? "",
                  })

                  if (!response.hasError) {
                    await presentToast({
                      ...toastOptions,
                      message: "Meldung erfolgreich!",
                      color: "success",
                      icon: checkmarkOutline,
                    })
                  } else {
                    await presentToast({
                      ...toastOptions,
                      message: `Fehler: ${response.errorMessages?.join("\n")}`,
                      color: "danger",
                      icon: warningOutline,
                    })
                  }
                } catch (error) {
                  // Show an error message
                  await presentToast({
                    ...toastOptions,
                    message: `Fehler: ${(error as Error).message}`,
                    color: "danger",
                    icon: warningOutline,
                  })
                  console.error(error)
                  // alert("An error occurred while updating the profile")
                }
              }}
            />
            {/* )} */}
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
            placeholder: saveRouteData?.name ?? "Name",
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
        <IonIcon icon={locationSharp} className="permanentIcon" />
        <IonText className="legend-text2">Akute Gefahrenstelle</IonText>
        <IonIcon icon={locationSharp} className="akutIcon" />
        <IonText className="legend-text">Permanente Gefahrenstelle</IonText>
        <IonIcon icon={locationSharp} className="onRouteIcon" />
        <IonText className="legend-text3">Gefahrenstelle auf Route</IonText>
      </div>
    </IonPage>
  )
}

export default Map
