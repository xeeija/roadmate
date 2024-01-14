import L, { ControlOptions } from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import "leaflet-control-geocoder"
import "./RoutingMachine.css"
import { RouteService } from "../../services/api/RouteService"
import { RouteRequest } from "../../services/entities/request/RouteRequest"
import { presentToast, dismissToast } from "../../utils/toastUtils"
import { ToastOptions } from "@ionic/react"
import { checkmarkOutline, warningOutline } from "ionicons/icons"

interface ExtendedControlOptions extends ControlOptions {
  userId: string
  userToken: string
  show: boolean
  waypoints?: L.LatLng[]
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
    const userId = props.userId
    const userToken = props.userToken
    const waypoints = props.waypoints || []

    const routeService = new RouteService()
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
          presentToast({
            ...toastOptions,
            message: "Route gespeichert",
            color: "success",
            icon: checkmarkOutline,
          })
        })
        .catch((error) => {
          console.log(error)
          presentToast({
            ...toastOptions,
            message: "Route speichern fehlgeschlagen",
            color: "danger",
            icon: warningOutline,
          })
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
