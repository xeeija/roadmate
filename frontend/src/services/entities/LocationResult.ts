export interface LocationResult {
  results: LocationSuggestion[]
}

// some properties omitted
export interface LocationSuggestion {
  country: string
  country_code: string
  state: string
  city: string
  suburb: string
  lon: number
  lat: number
  formatted: string
  address_line1: string
  address_line2: string
  category?: string
  plus_code: string
  plus_code_short: string
  result_type: string
  place_id: string
  name?: string
  postcode?: string
  district?: string
  street?: string
  housenumber?: string
}
