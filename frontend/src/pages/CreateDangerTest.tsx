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
import { DangerService } from "../services/api/DangerService"
import { UserService } from "../services/api/UserService"
import { DangerCategory } from "../services/entities/DangerCategory"
import { User } from "../services/entities/User"
import "./CreateDanger.css"

// TODO's:
// - Type of Danger mitgeben? (akut/permanent)
// - Funktionen: getCurrentLocation und handleLocationChange
// - EventHandler einbauen
//   - Map Picker
//   - Time/DatePicker

interface DangerRequestData {
  userId: string
  lat: number
  lon: number
  categoryId: string
  timestamp: Date
  description?: string
  location?: string
  addressName: string
  title: string
  categoryID: string
  otherCategory?: string
  activeAt?: Date
}

interface DangerData {
  dangerType: string
  description?: string
  location?: string
  lat: number
  lon: number
  addressName: string
  title: string
  categoryID: string
  otherCategory?: string
  activeAt?: Date
}

interface SelectValues {
  category: string
  dangerLocation: string
  type: string
  time: string
  description: string
}

const validationSchema = yup.object({
  description: yup.string(),
})

const initialValues: SelectValues = {
  //TODO: Category per default auf Unfall setzen
  category: "",
  dangerLocation: "currentLocation",
  type: "",
  time: "currentTime",
  description: "",
}

// // TODO: E.g. when user selects "Auf der Karte wählen"
// const handleLocationChange = (event: CustomEvent) => {
//   if (event.detail.value === "otherLocation") {
//     console.log("User wants to select location on map")
//   }
// }

const CreateDangerTest: FC = () => {
  const history = useHistory()

  // Get User Token and UserId
  const userService = new UserService()
  const dangerService = new DangerService()
  const [profileUser, setProfileUser] = useState<User>()
  const { currentUserToken, currentUser } = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.id && currentUserToken) {
        try {
          const userResponse = await userService.userGET(currentUser.id, currentUserToken)
          setProfileUser(userResponse?.data)
          // console.log(userResponse?.data)
        } catch (error) {
          console.error("error fetching user", error)
        }
      }
    }

    void fetchData()
  }, [])
  const [isChecked, setIsChecked] = useState(false)

  const handleToggleChange = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.id && currentUserToken) {
        try {
          const userResponse = await userService.userGET(currentUser.id, currentUserToken)
          setProfileUser(userResponse?.data)
          // console.log(userResponse?.data)
        } catch (error) {
          console.error("error fetching user", error)
        }
      }
    }

    void fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.id && currentUserToken) {
        try {
          const userResponse = await userService.userGET(currentUser.id, currentUserToken)
          setProfileUser(userResponse?.data)
          //console.log(userResponse?.data)
        } catch (error) {
          console.error("error fetching user", error)
        }
      }
    }

    void fetchData()
  }, [])

  // Get Danger Categories
  const [dangerCategories, setDangerCategories] = useState<DangerCategory[]>()

  const fetchDangerCategories = async () => {
    try {
      const dangerCategoryService = new DangerCategoryService()
      const result = await dangerCategoryService.dangerCategoryGET2(currentUserToken || "")
      // console.log(result.data)
      setDangerCategories(result.data)
      // Note: React State won't update immediately therefore the console.log will show undefined
      // console.log(dangerCategories)
    } catch (error) {
      console.error("Error fetching danger categories:", error)
    }
  }

  useEffect(() => {
    //console.log("Fetching danger categories")
    void fetchDangerCategories()
    void fetchDangerCategories()
  }, [])

  // Before sending data to backend, transform data to DangerRequestData
  const createDangerRequestData = async (values: SelectValues) => {
    const dangerRequestData: DangerRequestData = {
      userId: profileUser?.id || "",
      lat: 0,
      lon: 0,
      categoryId: values.category,
      timestamp: new Date(),
      description: values.description,
      addressName: "",
      title: "test",
      categoryID: "",
    }

    if (values.dangerLocation === "currentLocation") {
      // TODO: Get current location
      dangerRequestData.lat = 1.856754
      dangerRequestData.lon = 1.234567
    } else if (values.dangerLocation === "otherLocation") {
      dangerRequestData.lat = 0
      dangerRequestData.lon = 0
    }
    if (values.time === "otherTime") {
      //TODO: Get time from Time/Date Picker
    }

    void (await handleDangerRequest(dangerRequestData))
  }

  const dangerRequestService = new DangerRequestService()
  const handleDangerRequest = async (dangerRequestData: DangerRequestData) => {
    try {
      //console.log(dangerRequestData)
      const response = await dangerRequestService.create(dangerRequestData, currentUserToken || "")
      const data = response?.data
      if (data) {
        history.push(`/homescreen`)
      }
    } catch (error) {
      console.error("DangerRequest error", error)
    }
  }

  // ----- Fallback Values ----
  const fallBackValues = {
    lat: 53.551086,
    lon: 9.993682,
    categoryID: "8b2bd105-5ae3-4f00-8939-0f0603bee564",
  }

  const initialValues: SelectValues = {
    //TODO: Category per default auf Unfall setzen
    category: "",
    dangerLocation: "currentLocation",
    type: "",
    time: "currentTime",
    description: "",
  }

  const validationSchema = yup.object({
    description: yup.string(),
  })

  const testData: DangerData = {
    dangerType: "Unfall",
    description: "test DangerService",
    lat: fallBackValues.lat,
    lon: fallBackValues.lon,
    addressName: "Schlumpfstraße 12",
    title: "Test",
    otherCategory: "",
    categoryID: "8b2bd105-5ae3-4f00-8939-0f0603bee564",
    activeAt: new Date(),
  }

  // -----------------------ChatGPT Help ----------------------------
  const [formData, setFormData] = useState<DangerData>({
    dangerType: "",
    description: "",
    location: "",
    lat: 0,
    lon: 0,
    addressName: "",
    title: "",
    categoryID: "",
    otherCategory: "",
    activeAt: new Date(),
  })

  const handleFieldChange = (fieldName: keyof DangerData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolBar title="Melden" />
      </IonHeader>

      <IonContent scroll-y="false">
        <IonCard color="light" className="customCard">
          <IonCardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                void createDangerRequestData(values)
              }}
            >
              <Form>
                {/* <Select
                  name="categoryId"
                  label="Art der Gefahrenstelle"
                  icon={true}
                  iconName="warningSharp"
                  className="customItem"
                  //Hier CategoryId hinein mappen
                  options={[
                    { value: "123", label: "Unfall" },
                    { value: "456", label: "Klimakleber" },
                  ]}
                /> */}

                {/* Select Danger Category */}
                <Select
                  name="category"
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
                    { value: "otherLocation", label: "Auf der Karte wählen" },
                  ]}
                  //onChange={handleLocationChange}
                />

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
                />

                {/* Input Description */}
                <div className="customItem textArea">
                  <IonIcon icon={informationCircleOutline} className="customDescriptionIcon" />
                  <Input
                    multiline
                    name="description"
                    label="Beschreibung?"
                    placeholder="Beschreibe die Gefahrenstelle etwas näher"
                  />
                </div>

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

export default CreateDangerTest
