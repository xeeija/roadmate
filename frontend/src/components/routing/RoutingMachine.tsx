import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = () => {

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(47.06658740529705, 15.446622566627681),
      L.latLng(47.066497966340485, 15.43830029261831)
    ],
    lineOptions: {styles: [{ color: "#6FA1EC", weight: 5 }]},
    show: false,
    autoRoute: true,
    addWaypoints: false,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: true,
    extendToWaypoints: true,
    missingRouteTolerance: true,
  });



  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
