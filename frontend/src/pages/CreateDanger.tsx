import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonToggle,
} from "@ionic/react"
import { Form, Formik } from "formik"
import {
  alarm,
  hammer,
  informationCircleOutline,
  locationSharp,
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
import { DangerCategory } from "../services/entities/DangerCategory"
import "./CreateDanger.css"
//import DatePicker from "react-datepicker"

// TODO's:
// - handleLocationChange
// - Error handling? (e.g. invalid time/location, geoLocation)

interface CreateDangerData {
  categoryId: string
  dangerLocation: string
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

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(new Date(event.target.value))
    // console.log("Selected Time: ", time)
  }

  // Before sending data to backend, transform data to DangerRequestData
  const createDangerRequest = async (values: CreateDangerData) => {
    const lat = location.lat
    const lon = location.lon

    console.log("submit request", values, time, lat, lon)

    try {
      // console.log(dangerRequestData)
      const response = await dangerRequestService.create(
        {
          categoryId: values.categoryId,
          description: values.description,
          timestamp: values.time === "otherTime" ? time : undefined,
          userId: currentUser?.id,
          lat: lat,
          lon: lon,
        },
        currentUserToken || ""
      )
      const data = response?.data
      if (data) {
        history.push(`/homescreen`)
      }
    } catch (error) {
      console.error("DangerRequest error", error)
    }
  }

  const initialValues: CreateDangerData = {
    categoryId: "",
    dangerLocation: "currentLocation",
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
              <Form>
                {/* Select Danger Category */}
                <Select
                  name="categoryId"
                  label="Art der Gefahrenstelle"
                  icon={warningSharp}
                  className="customItem"
                  options={
                    dangerCategories?.map((x) => ({ value: x?.id || "", label: x?.name || "" })) ||
                    []
                  }
                />

                {/* Select Danger Location */}
                <Select
                  name="dangerLocation"
                  label="Wo ist die Gefahrenstelle"
                  icon={locationSharp}
                  className="customItem"
                  options={[
                    { value: "currentLocation", label: "Mein Standort" },
                    { value: "otherLocation", label: "Adresse wählen" },
                  ]}
                  onChange={handleLocationChange}
                />

                {/* TODO */}
                {showLocationPicker && <Input name="adress" label="Adresse" />}

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
                <Select
                  name="time"
                  label="Wann ist der Vorfall passiert?"
                  icon={alarm}
                  className="customItem"
                  options={[
                    { value: "currentTime", label: "In diesem Augenblick" },
                    { value: "otherTime", label: "Uhrzeit wählen" },
                  ]}
                  onChange={displayTimePicker}
                />

                {showTimePicker && (
                  <input
                    //style={{ display: "block", margin: "0 auto" }}
                    className="customDatePicker"
                    type="datetime-local"
                    id="danger-time"
                    name="danger-time"
                    onChange={handleTimeChange}
                  />
                )}

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
            </Formik>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default CreateDanger
