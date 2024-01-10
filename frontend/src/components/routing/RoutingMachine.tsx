import L, { ControlOptions } from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import "leaflet-control-geocoder"
import "./RoutingMachine.css"
import { RouteService } from "../../services/api/RouteService"
import { RouteRequest } from "../../services/entities/request/RouteRequest"

/* interface ButtonStyle {
  [key: string]: string | undefined
  width?: string
  height?: string
  fontSize?: string
  backgroundColor?: string
  color?: string
  border?: string
  padding?: string
  margin?: string
  borderRadius?: string
} */

interface ExtendedControlOptions extends ControlOptions {
  userId: string
  userToken: string
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

  /*   for (const property in style) {
    if (property !== "length" && property !== "parentRule") {
      (btn.style as React.CSSProperties)[property] = style[property]
    }
  } */

  btn.addEventListener("click", () => {
    handleSaveRoute()
    console.log("Route gespeichert")
  })

  return btn
}

const createRoutingMachineLayer = () => {
  return (props: ExtendedControlOptions) => {
    const userId = props.userId
    const userToken = props.userToken

    const routeService = new RouteService()
    const handleSaveRoute = () => {
      const waypoints = plan.getWaypoints()
      const fromWaypoint = waypoints[0]
      const toWaypoint = waypoints[waypoints.length - 1]

      const routeData: RouteRequest = {
        userId: userId,
        name:
          "Von " +
          fromWaypoint.name?.split(",", 3).slice(0, 2).join(",") +
          " nach " +
          toWaypoint.name?.split(",", 3).slice(0, 2).join(","),
        fromLat: fromWaypoint.latLng.lat,
        fromLon: fromWaypoint.latLng.lng,
        toLat: toWaypoint.latLng.lat,
        toLon: toWaypoint.latLng.lng,
        fromAddressName: fromWaypoint.name,
        toAddressName: toWaypoint.name,
        notificationEnabled: true,
      }

      routeService
        .routePOST(userToken, routeData)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
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

    const waypoints = [
      L.latLng(47.061207394310735, 15.431929877161728),
      L.latLng(47.06028439128265, 15.45535951123882),
    ]

    const plan = new ExtendedPlan(waypoints, {
      geocoder: L.Control.Geocoder.nominatim(),
      routeWhileDragging: true,
      addWaypoints: true,
      reverseWaypoints: true,
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
      show: true,
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
