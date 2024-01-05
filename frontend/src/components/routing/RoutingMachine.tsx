import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import "leaflet-control-geocoder"

interface ButtonStyle {
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
}

function createButton(label: string, container: HTMLElement, style: ButtonStyle): HTMLElement {
  const btn = L.DomUtil.create("button", "", container)
  btn.setAttribute("type", "button")
  btn.innerHTML = label
  btn.id = "saveRoute"

  // Apply the styles
  for (const property in style) {
    if (property !== "length" && property !== "parentRule") {
      ;(btn.style as any)[property] = style[property]
    }
  }

  btn.addEventListener("click", () => {
    console.log("Route wurde gespeichert")
  })

  return btn
}

const createRoutingMachineLayer = () => {
  var ExtendedPlan = L.Routing.Plan.extend({
    createGeocoders: function () {
      var container = L.Routing.Plan.prototype.createGeocoders.call(this),
        saveRoute = createButton("Route speichern", container, {
          width: "100px",
          height: "40px",
          fontSize: "12px",
          backgroundColor: "#156064",
          color: "white",
          border: "none",
          padding: "5px",
          margin: "5px",
          borderRadius: "5px",
        })
      return container
    },
  }) as any as typeof L.Routing.Plan

  const waypoints = [
    L.latLng(47.061207394310735, 15.431929877161728),
    L.latLng(47.06028439128265, 15.45535951123882),
  ]

  var plan = new ExtendedPlan(waypoints, {
    geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
    addWaypoints: true,
    reverseWaypoints: true,
  })

  // Still needed for reference, dont delete yet

  //  const plan = L.Routing.plan(waypoints, {
  //    geocoder: L.Control.Geocoder.nominatim(),
  //    routeWhileDragging: true,
  //    addWaypoints: false,
  //  })

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
  })

  return instance
}

const RoutingMachine = createControlComponent(createRoutingMachineLayer)

export default RoutingMachine
