import { ToastOptions } from "@ionic/react"
import { createControlComponent } from "@react-leaflet/core"
import { warningOutline } from "ionicons/icons"
import L, { ControlOptions } from "leaflet"
import "leaflet-control-geocoder"
import "leaflet-routing-machine"
import { dismissToast, presentToast } from "../../utils/toastUtils"
import "./RoutingMachine.css"

interface ExtendedControlOptions extends ControlOptions {
  userId: string
  userToken: string
  show: boolean
  waypoints?: L.LatLng[]
  showRouteAlert?: (route: RouteData) => void
  isStatic: boolean
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
  const btn = L.DomUtil.create("button", "", container)
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
      console.log(waypoints)
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

    const ExtendedPlan = L.Routing.Plan.extend({
      createGeocoders: function () {
        const container: HTMLElement = L.Routing.Plan.prototype.createGeocoders.call(
          this
        ) as HTMLElement
        createButton("Route speichern", container, handleSaveRoute)

        return container
      },
    }) as typeof L.Routing.Plan

    /*     const waypoints = [
      L.latLng(47.061207394310735, 15.431929877161728),
      L.latLng(47.06028439128265, 15.45535951123882),
    ] */

    const plan = new ExtendedPlan(waypoints, {
      geocoder: L.Control.Geocoder.nominatim(),
      routeWhileDragging: true,
      addWaypoints: true,
      reverseWaypoints: true,
      draggableWaypoints: !props.isStatic,
    })

    const instance = L.Routing.control({
      plan: plan,
      lineOptions: {
        styles: [{ color: "#6FA1EC", opacity: 0.8, weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 5,

      },
      router: L.Routing.osrmv1({
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
