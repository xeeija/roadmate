import { IonInputCustomEvent } from "@ionic/core"
import {
  InputChangeEventDetail,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToastOptions,
  useIonToast,
} from "@ionic/react"
import { Form, Formik } from "formik"
import {
  alarm,
  checkmarkOutline,
  hammer,
  informationCircleOutline,
  locationSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons"
import { FC, useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import * as yup from "yup"
import { Input } from "../components/Input"
import { UserContext } from "../components/ProtectedRoute"
import { Select } from "../components/Select"
import ToolBar from "../components/navigation/ToolBar"
import { DangerCategoryService } from "../services/api/DangerCategoryService"
import { DangerRequestService } from "../services/api/DangerRequestService"
import { RouteService } from "../services/api/RouteService"
import { DangerCategory } from "../services/entities/DangerCategory"
import { LocationSuggestion } from "../services/entities/LocationResult"
import "./CreateDanger.css"
//import DatePicker from "react-datepicker"

// TODO's:
// - handleLocationChange
// - Error handling? (e.g. invalid time/location, geoLocation)

// interface LocationResult {
//   results: LocationSuggestion[]
// }

// some properties omitted
// interface LocationSuggestion {
//   country: string
//   country_code: string
//   state: string
//   city: string
//   suburb: string
//   lon: number
//   lat: number
//   formatted: string
//   address_line1: string
//   address_line2: string
//   category?: string
//   plus_code: string
//   plus_code_short: string
//   result_type: string
//   place_id: string
//   name?: string
//   postcode?: string
//   district?: string
//   street?: string
//   housenumber?: string
// }

interface CreateDangerData {
  categoryId: string
  dangerLocation: "currentLocation" | "otherLocation" | "address"
  address: string
  type: string
  time: "currentTime" | "otherTime"
  description: string
}

const CreateDanger: FC = () => {
  const history = useHistory()

  // Get User Token and UserId
  // Permanent danger toggle

  // Get user token and userId
  const dangerRequestService = new DangerRequestService()
  const routeService = new RouteService()
  const { currentUserToken, currentUser } = useContext(UserContext)

  const [isChecked, setIsChecked] = useState(false)

  const handleToggleChange = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    void fetchDangerCategories()
    void getCurrentLocation()
  }, [])

  // Get danger categories
  const [dangerCategories, setDangerCategories] = useState<DangerCategory[]>()

  const fetchDangerCategories = async () => {
    try {
      const dangerCategoryService = new DangerCategoryService()
      const result = await dangerCategoryService.dangerCategoryGET2(currentUserToken || "")
      // console.log(result.data)
      setDangerCategories(
        result.data?.sort(
          (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
        )
      )

      // Note: React State won't update immediately therefore the console.log will show undefined
      // console.log(dangerCategories)
    } catch (error) {
      console.error("Error fetching danger categories:", error)
    }
  }

  // Get location
  const [location, setLocation] = useState({ lat: 0, lon: 0 })
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lon: longitude })
          // console.log("Location: ", location)
        },
        (error) => {
          console.log("Error: ", error)
        }
      )
    } else {
      console.error("Geolocation is not supported in this browser.")
      // Error handling?
    }
  }

  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)

  const handleLocationChange = (event: CustomEvent) => {
    const selectedValue = (event.target as HTMLInputElement).value
    setShowLocationPicker(selectedValue === "otherLocation")
  }

  // Get time from time/date picker
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [time, setTime] = useState<Date>(new Date())

  const displayTimePicker = (event: CustomEvent) => {
    const selectedValue = (event.target as HTMLInputElement).value
    setShowTimePicker(selectedValue === "otherTime")
  }

  const handleTimeChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
    setTime(new Date(event.detail.value ?? ""))
    // console.log("Selected Time: ", time)
  }

  const [presentToast, dismissToast] = useIonToast()

  const toastOptions: ToastOptions = {
    duration: 5000,
    position: "bottom",
    buttons: [{ text: "OK", handler: () => dismissToast() }],
  }

  // Before sending data to backend, transform data to DangerRequestData
  const createDangerRequest = async (values: CreateDangerData) => {
    const lat = location.lat
    const lon = location.lon

    let addressName = values.address

    if (values.address === "") {
      const response = await routeService.routeGeocodeReverseGET(currentUserToken ?? "", lat, lon)

      if (!response.data || response.hasError) {
        await presentToast({
          ...toastOptions,
          message: `Fehler: Adresse nicht gefunden: ${response.errorMessages?.join("\n")}`,
          color: "danger",
          icon: warningOutline,
        })
        return
      }

      addressName = response.data?.results[0].formatted
      console.log("address", addressName)
    }

    console.log("submit request", addressName, values, time, lat, lon)

    try {
      // console.log(dangerRequestData)
      const response = await dangerRequestService.create(
        {
          categoryId: values.categoryId,
          description: values.description,
          timestamp: values.time === "currentTime" ? undefined : time,
          userId: currentUser?.id,
          lat: lat,
          lon: lon,
          addressName: addressName,
        },
        currentUserToken || ""
      )

      if (response?.data && !response.hasError) {
        await presentToast({
          ...toastOptions,
          message: "Meldung gespeichert!",
          color: "success",
          icon: checkmarkOutline,
        })

        history.push(`/homescreen`)
      } else {
        await presentToast({
          ...toastOptions,
          message: `Fehler: ${response.errorMessages?.join("\n")}`,
          color: "danger",
          icon: warningOutline,
        })
      }
    } catch (error) {
      await presentToast({
        ...toastOptions,
        message: `Fehler: ${(error as Error).message}`,
        color: "danger",
        icon: warningOutline,
      })
      console.error("DangerRequest error", error)
    }
  }

  const initialValues: CreateDangerData = {
    categoryId: "",
    dangerLocation: "currentLocation",
    address: "",
    type: "",
    time: "currentTime",
    description: "",
  }

  const validationSchema = yup.object({
    description: yup.string(),
  })

  return (
    <IonPage>
      <IonHeader>
        <ToolBar title="Melden" />
      </IonHeader>

      <IonContent scroll-y="false">
        <IonCard color="light" className="customCard">
          <IonCardContent>
            <Formik
              initialValues={{
                ...initialValues,
                categoryId: dangerCategories?.[0].id ?? "",
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await createDangerRequest(values)
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  {/* Select Danger Category */}
                  <Select
                    name="categoryId"
                    label="Art der Gefahrenstelle"
                    icon={warningSharp}
                    className="customItem"
                    options={
                      dangerCategories?.map((x) => ({
                        value: x?.id || "",
                        label: x?.name || "",
                      })) || []
                    }
                  />
                  {/* Select Danger Location */}
                  <div className="customItem">
                    <Select
                      name="dangerLocation"
                      label="Wo ist die Gefahrenstelle"
                      icon={locationSharp}
                      // className="customItem"
                      options={[
                        { value: "currentLocation", label: "Mein Standort" },
                        { value: "otherLocation", label: "Adresse wählen" },
                        ...(values.address ? [{ value: "address", label: values.address }] : []),
                      ]}
                      onChange={handleLocationChange}
                    />
                  </div>

                  {/* {showLocationPicker && (
                    <>
                      <Input
                        name="address"
                        label="Adresse"
                        debounce={1000}
                        onInput={(ev) =>
                          void (async () => {
                            const query = ev.detail.value
                            const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY as string

                            const response = await fetch(
                              `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&lang=de&apiKey=${apiKey}`
                            )

                            const data = (await response.json()) as LocationResult

                            await setFieldValue("address", query)
                            setSuggestions(data.results)

                            if (suggestions.length === 1) {
                              setLocation({
                                lat: suggestions[0].lat,
                                lon: suggestions[0].lon,
                              })
                              await setFieldValue("address", suggestions[0].formatted)
                            } else {
                              setSuggestionsOpen(true)
                            }
                          })()
                        }
                        // onFocus={() => {
                        //   // if (suggestions.length > 0 && (location.lat === 0 && location.lon === 0)) {
                        //   //   setSuggestionsOpen(true)
                        //   // }
                        // }}
                      />
                      <IonPopover
                        isOpen={suggestionsOpen}
                        onDidDismiss={() => setSuggestionsOpen(false)}
                        showBackdrop={false}
                        dismissOnSelect
                        backdropDismiss
                      >
                        <IonContent color="light">
                          {suggestions?.map((s) => (
                            <IonItem
                              key={s.place_id}
                              button
                              onClick={() => {
                                console.log("clicked item", s)
                                setLocation({ lat: s.lat, lon: s.lon })
                                void setFieldValue("address", s.formatted)
                              }}
                            >
                              {s.formatted}
                            </IonItem>
                          ))}
                        </IonContent>
                      </IonPopover>
                    </>
                  )} */}

                  <IonModal
                    isOpen={showLocationPicker}
                    onDidDismiss={() => setShowLocationPicker(false)}
                  >
                    <IonHeader>
                      <IonToolbar color="primary">
                        <IonButtons slot="start">
                          <IonButton
                            onClick={() => {
                              setShowLocationPicker(false)
                              void setFieldValue("dangerLocation", "currentLocation")
                              void setFieldValue("address", "")
                              setSuggestions([])
                            }}
                          >
                            Abbrechen
                          </IonButton>
                        </IonButtons>
                        <IonTitle>Adresse wählen</IonTitle>
                        {/* <IonButtons slot="end">
                          <IonButton onClick={() => setSuggestionsOpen(false)}>Speichern</IonButton>
                        </IonButtons> */}
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding" color="light">
                      <div style={{ marginBottom: "1rem" }}>
                        <Input
                          name="address"
                          label="Adresse"
                          debounce={500}
                          onInput={(ev) =>
                            void (async () => {
                              const query = ev.detail.value

                              if (query?.length === 0) {
                                setSuggestions([])
                                await setFieldValue("address", "")
                              }

                              if ((query?.length ?? 0) <= 3) {
                                return
                              }

                              const response = await routeService.routeGeocodeAutocompleteGET(
                                currentUserToken ?? "",
                                query ?? ""
                              )

                              console.log("respo", response)

                              if (!response.data || response.hasError) {
                                await presentToast({
                                  ...toastOptions,
                                  message: `Fehler beim Laden der Vorschläge: ${response.errorMessages?.join(
                                    "\n"
                                  )}`,
                                  color: "danger",
                                  icon: warningOutline,
                                })
                                return
                              }

                              await setFieldValue("address", query)
                              setSuggestions(response.data.results)

                              if (suggestions.length === 1) {
                                setLocation({
                                  lat: suggestions[0].lat,
                                  lon: suggestions[0].lon,
                                })
                                await setFieldValue("address", suggestions[0].formatted)
                              } else {
                                setSuggestionsOpen(true)
                              }
                            })()
                          }
                          onFocus={() => {
                            // if (suggestions.length > 0 && (location.lat === 0 && location.lon === 0)) {
                            //   setSuggestionsOpen(true)
                            // }
                          }}
                        />
                      </div>

                      {suggestionsOpen && (
                        <>
                          {/* <IonText color="tertiary">
                            <h5 style={{ marginLeft: "1rem" }}>Vorschläge</h5>
                          </IonText> */}

                          {suggestions?.map((s) => (
                            <IonItem
                              key={s.place_id}
                              button
                              style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}
                              onClick={() => {
                                // console.log("clicked item", s)
                                setShowLocationPicker(false)
                                setLocation({ lat: s.lat, lon: s.lon })
                                void setFieldValue("address", s.formatted)
                                void setFieldValue("dangerLocation", "address")
                                setSuggestions([])
                              }}
                            >
                              {s.formatted}
                            </IonItem>
                          ))}
                        </>
                      )}
                    </IonContent>
                  </IonModal>
                  {/* Toggle Permanent Danger */}
                  <IonItem className="customItem" lines="none">
                    <IonIcon icon={hammer} className="customIcon" />
                    <IonInput
                      label="Permanente Gefahrenstelle?"
                      labelPlacement={"floating"}
                      value={isChecked ? "Ja" : "Nein"}
                      readonly={true}
                    ></IonInput>
                    <IonToggle
                      className="customToggle custom-toggle-input"
                      checked={isChecked}
                      onIonChange={handleToggleChange}
                    />
                  </IonItem>
                  {/* Select Timestamp */}
                  <div className="customItem">
                    <Select
                      name="time"
                      label="Wann ist der Vorfall passiert?"
                      icon={alarm}
                      // className="customItem"
                      options={[
                        { value: "currentTime", label: "In diesem Augenblick" },
                        { value: "otherTime", label: "Uhrzeit wählen" },
                      ]}
                      onChange={displayTimePicker}
                    />
                    {showTimePicker && (
                      <IonItem lines="none">
                        <IonInput
                          //style={{ display: "block", margin: "0 auto" }}
                          // className="customDatePicker"
                          type="datetime-local"
                          id="danger-time"
                          name="danger-time"
                          onIonChange={(ev) => handleTimeChange(ev)}
                        />
                      </IonItem>
                    )}
                  </div>

                  {/* {showTimePicker && (
                  // React Datepicker doesn't work properly
                  <div style={{ position: "relative", zIndex: 999 }}>
                    <DatePicker
                      showTimeSelect
                      minTime={new Date(0, 0, 0, 12, 30)}
                      maxTime={new Date(0, 0, 0, 19, 0)}
                      selected={date}
                      //onChange={}
                    />
                  </div>
                )} */}
                  {/* Input additional danger Description */}
                  <Input
                    multiline
                    name="description"
                    label="Beschreibung?"
                    icon={informationCircleOutline}
                    placeholder="Beschreibe die Gefahrenstelle etwas näher"
                  />
                  {/* Submit Button */}
                  <IonButton className="customButton" type="submit">
                    Gefahrenstelle melden
                  </IonButton>
                </Form>
              )}
            </Formik>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default CreateDanger
