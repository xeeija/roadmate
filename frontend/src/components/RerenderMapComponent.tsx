import { useMap } from "react-leaflet"
import { useEffect } from "react"

const RerenderMapComponent = () => {
  const map = useMap()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (map) {
        map.invalidateSize()
      }
    }, 100)

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
    }
  }, [map])

  return null
}

export default RerenderMapComponent
