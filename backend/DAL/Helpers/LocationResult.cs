using Newtonsoft.Json;

namespace DAL.Helpers;

public class LocationResult {
  [JsonProperty("results")]
  public LocationSuggestion[] Results { get; set; }
}

public class LocationSuggestion {
  [JsonProperty("name")]
  public string Name { get; set; }

  [JsonProperty("country")]
  public string Country { get; set; }

  [JsonProperty("country_code")]
  public string CountryCode { get; set; }

  [JsonProperty("state")]
  public string State { get; set; }

  [JsonProperty("city")]
  public string City { get; set; }

  [JsonProperty("postcode")]
  public string Postcode { get; set; }

  [JsonProperty("district")]
  public string District { get; set; }

  [JsonProperty("suburb", NullValueHandling = NullValueHandling.Ignore)]
  public string Suburb { get; set; }

  [JsonProperty("street")]
  public string Street { get; set; }

  [JsonProperty("housenumber", NullValueHandling = NullValueHandling.Ignore)]
  public string Housenumber { get; set; }

  [JsonProperty("lon")]
  public double Lon { get; set; }

  [JsonProperty("lat")]
  public double Lat { get; set; }

  [JsonProperty("result_type")]
  public string ResultType { get; set; }

  [JsonProperty("formatted")]
  public string Formatted { get; set; }

  [JsonProperty("address_line1")]
  public string AddressLine1 { get; set; }

  [JsonProperty("address_line2")]
  public string AddressLine2 { get; set; }

  [JsonProperty("category", NullValueHandling = NullValueHandling.Ignore)]
  public string Category { get; set; }

  [JsonProperty("plus_code")]
  public string PlusCode { get; set; }

  [JsonProperty("plus_code_short")]
  public string PlusCodeShort { get; set; }

  [JsonProperty("place_id")]
  public string PlaceId { get; set; }

  [JsonProperty("county", NullValueHandling = NullValueHandling.Ignore)]
  public string County { get; set; }

  [JsonProperty("village", NullValueHandling = NullValueHandling.Ignore)]
  public string Village { get; set; }

  [JsonProperty("footway", NullValueHandling = NullValueHandling.Ignore)]
  public string Footway { get; set; }
}
