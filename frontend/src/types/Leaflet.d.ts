import L from "leaflet"

declare module "leaflet" {
  namespace Control {
    class Geocoder {
      constructor()
      geocode(query: string, cb: (results: GeocoderResult[]) => void): void
      reverse(
        location: L.LatLngLiteral,
        scale: number,
        cb: (results: GeocoderResult[]) => void,
        context: unknown
      ): void
      static nominatim(options?: Omit<GeocoderOptions, "service">): Geocoder
    }
  }
}
