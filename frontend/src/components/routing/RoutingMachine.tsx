import { ToastOptions } from "@ionic/react"
import { createControlComponent } from "@react-leaflet/core"
import { warningOutline } from "ionicons/icons"
import { Control, ControlOptions, DomUtil, LatLng, Routing } from "leaflet"
import "leaflet-control-geocoder"
import "leaflet-routing-machine"
import { dismissToast, presentToast } from "../../utils/toastUtils"
import "./RoutingMachine.css"
import L from "leaflet"

interface ExtendedControlOptions extends ControlOptions {
  userId: string
  userToken: string
  show: boolean
  waypoints?: LatLng[]
  showRouteAlert?: (route: RouteData) => void
  isStatic: boolean
  onRoutesFound?: (routes: L.LatLng[][]) => void
}

interface RouteEvent {
  routes: Route[]
}

interface Route {
  coordinates: Coordinate[]
}

interface Coordinate {
  lat: number
  lng: number
}

export type RouteData = {
  name: string
  fromLat: number
  fromLon: number
  toLat: number
  toLon: number
  fromAddressName: string
  toAddressName: string
}

function createButton(
  label: string,
  container: HTMLElement,
  handleSaveRoute: () => void
): HTMLElement {
  const btn = DomUtil.create("button", "", container)
  btn.setAttribute("type", "button")
  btn.innerHTML = label
  btn.id = "saveRoute"
  btn.style.width = "135px"
  btn.style.height = "35px"
  btn.style.fontSize = "13px"
  btn.style.fontFamily = "Hammersmith One"
  btn.style.fontWeight = "lighter"
  btn.style.backgroundColor = "#156064"
  btn.style.color = "white"
  btn.style.borderColor = "transparent"
  btn.style.padding = "5px"
  btn.style.borderRadius = "5px"
  btn.style.position = "absolute"
  btn.style.top = "110px"
  btn.style.right = "50px"

  btn.addEventListener("click", () => {
    handleSaveRoute()
  })

  return btn
}

const toastOptions: ToastOptions = {
  duration: 5000,
  position: "bottom",
  buttons: [{ text: "OK", handler: () => dismissToast() }],
}

const createRoutingMachineLayer = () => {
  return (props: ExtendedControlOptions) => {
    const waypoints = props.waypoints || []

    const handleSaveRoute = () => {
      const waypoints = plan.getWaypoints()
      const fromWaypoint = waypoints[0]
      const toWaypoint = waypoints[waypoints.length - 1]

      if (!fromWaypoint.latLng || !toWaypoint.latLng) {
        presentToast({
          ...toastOptions,
          message: "Start- oder Endpunkt fehlt. Route kann nicht gespeichert werden.",
          color: "warning",
          icon: warningOutline,
        })
        console.log("Start point or end point is missing. Cannot save route.")
        return
      }

      const fromName = fromWaypoint.name?.split(",", 3).slice(0, 2).join(",")
      const toName = toWaypoint.name?.split(",", 3).slice(0, 2).join(",")

      props.showRouteAlert?.({
        name: `Von ${fromName} nach ${toName}`,
        fromLat: fromWaypoint.latLng.lat,
        fromLon: fromWaypoint.latLng.lng,
        toLat: toWaypoint.latLng.lat,
        toLon: toWaypoint.latLng.lng,
        fromAddressName: `${fromWaypoint.name}`,
        toAddressName: `${toWaypoint.name}`,
      })
    }

    const ExtendedPlan = Routing.Plan.extend({
      createGeocoders: function () {
        const container: HTMLElement = Routing.Plan.prototype.createGeocoders.call(
          this
        ) as HTMLElement
        createButton("Route speichern", container, handleSaveRoute)

        return container
      },
    }) as typeof L.Routing.Plan

    const plan = new ExtendedPlan(waypoints, {
      geocoder: Control.Geocoder.nominatim(),
      routeWhileDragging: true,
      addWaypoints: true,
      reverseWaypoints: true,
      draggableWaypoints: !props.isStatic,
    })

    const instance = Routing.control({
      plan: plan,
      lineOptions: {
        styles: [{ color: "#6FA1EC", opacity: 0.8, weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 5,
      },
      router: Routing.osrmv1({
        serviceUrl: "https://routing.openstreetmap.de/routed-bike/route/v1",
        profile: "driving",
        language: "de",
      }),
      show: props.show,
      autoRoute: true,
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      collapsible: false,
    }).on("routesfound", function (e: RouteEvent) {
      const routes = e.routes
      const coords = routes[0].coordinates.map((coord: Coordinate) =>
        L.latLng(coord.lat, coord.lng)
      )
      props.onRoutesFound?.([coords])
    })

    const container = instance.getContainer()
    if (container) {
      container.classList.add("custom-routing-machine-container")
    }

    return instance
  }
}

const RoutingMachine = createControlComponent(createRoutingMachineLayer())

export default RoutingMachine
