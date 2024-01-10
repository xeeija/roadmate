import { FC } from "react"
import Map from "../components/routing/Map"
import "./Homescreen.css"

const Homescreen: FC = () => {
  return (
    <div className="map">
      <Map />
    </div>
  )
}

export default Homescreen

