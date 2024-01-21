import { FC, useEffect, useState } from "react"
import Map from "../components/routing/Map"
import "./Homescreen.css"
import { useLocation } from "react-router-dom"

type RouteType = { fromLat: number; fromLng: number; toLat: number; toLng: number } | undefined

const Homescreen: FC = () => {
  const location = useLocation<{ route: RouteType }>()
  const [route, setRoute] = useState<RouteType>(location.state?.route)
  const [renderCount, setRenderCount] = useState(0)

  useEffect(() => {
    // Update route state when location.state.route changes
    setRoute((prevRoute) => location.state?.route ?? prevRoute)
    setRenderCount((prevCount) => prevCount + 1)

    // Cleanup function to clear route state when component unmounts
    return () => {
      setRoute(undefined)
    }
  }, [JSON.stringify(location.state?.route)])

  return (
    <div className="map">
      <Map route={route} renderCount={renderCount} />
    </div>
  )
}

export default Homescreen
