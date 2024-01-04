import L from "leaflet"

declare module "leaflet" {
  namespace Control {
    class Geocoder {
      constructor()
      geocode(query: string, cb: (results: any) => void): void
      reverse(
        location: L.LatLngLiteral,
        scale: number,
        cb: (results: any) => void,
        context: any
      ): void
      static nominatim(options?: any): Geocoder
    }
  }
}
