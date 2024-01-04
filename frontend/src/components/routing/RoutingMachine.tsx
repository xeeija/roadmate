import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import "leaflet-control-geocoder"

function createButton(label: string, container: HTMLElement): HTMLElement {
  const btn = L.DomUtil.create("button", "", container)
  btn.setAttribute("type", "button")
  btn.innerHTML = label
  btn.style.width = "100px"
  btn.style.height = "50px"
  btn.style.fontSize = "12px"
  btn.style.backgroundColor = "#156064"
  btn.style.color = "white"
  btn.style.border = "none"
  btn.style.padding = "5px"
  btn.style.borderRadius = "5px"
  return btn
}

const createRoutineMachineLayer = () => {
  var ReversablePlan = L.Routing.Plan.extend({
    createGeocoders: function () {
      var container = L.Routing.Plan.prototype.createGeocoders.call(this),
        reverseButton = createButton("Route speichern", container)
      return container
    },
  }) as any as typeof L.Routing.Plan

  const waypoints = [
    L.latLng(47.06658740529705, 15.446622566627681),
    L.latLng(47.066497966340485, 15.43830029261831),
  ]

  var plan = new ReversablePlan(
    [
      L.latLng(47.06658740529705, 15.446622566627681),
      L.latLng(47.066497966340485, 15.43830029261831),
    ],
    {
      geocoder: L.Control.Geocoder.nominatim(),
      routeWhileDragging: true,
      addWaypoints: true,
    }
  )

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
    show: false,
    autoRoute: true,
    addWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  })

  return instance
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer)

export default RoutingMachine
