/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToggle,
} from "@ionic/react"
import {
  alarm,
  caretDown,
  hammer,
  informationCircleOutline,
  locationSharp,
  warningSharp,
} from "ionicons/icons"
import { FC, useContext, useEffect, useState } from "react"
import ToolBar from "../components/navigation/ToolBar"
import "./CreateDanger.css"
import { UserService } from "../services/api/UserService"
import { UserContext } from "../components/ProtectedRoute"
import { User } from "../services/entities/User"
import { DangerService } from "../services/api/DangerService"
import { useHistory } from "react-router"

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

const CreateDangerTest: FC = () => {
  const history = useHistory()

  // ADDED: USER SERVICE
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

  // ----- Fallback Values ----
  const fallBackValues = {
    lat: 53.551086,
    lon: 9.993682,
    categoryID: "8b2bd105-5ae3-4f00-8939-0f0603bee564",
  }

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

  const handleDangerRequest = async (dangerData: DangerData) => {
    // Fallback values for testing
    dangerData.categoryID = fallBackValues.categoryID
    dangerData.lat = fallBackValues.lat
    dangerData.lon = fallBackValues.lon
    console.log(dangerData)

    /*
    try {
      //console.log("In handleDangerRequest")
      const response = await dangerService.dangerPOST(dangerData, currentUserToken || "")

      const data = response?.data
      if (data) {
        history.push(`/homescreen`)
      }
    } catch (error) {
      console.error("Danger Request error", error)
    } */
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
            {/* ----- Input DangerType ----- */}
            <IonItem className="customItem">
              <IonIcon icon={warningSharp} className="customIcon" />
              <IonSelect
                label="Art der Gefahrenstelle"
                labelPlacement={"floating"}
                toggleIcon={caretDown}
                interface="popover"
                onIonChange={(e) => handleFieldChange("dangerType", e.detail.value as string)}
              >
                {/* TODO Hier kommen die möglichen Arten von Gefahrenstellen --> Service zu implementieren */}
                <IonSelectOption className="customSelectOption" value="unfall">
                  Unfall
                </IonSelectOption>
                <IonSelectOption className="customSelectOption" value="block">
                  Klimakleber
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            {/* ----- Input Location ----- */}
            <IonItem className="customItem">
              <IonIcon icon={locationSharp} className="customIcon" />
              <IonSelect
                label="Wo ist die Gefahrenstelle"
                labelPlacement={"floating"}
                toggleIcon={caretDown}
                interface="popover"
                onIonChange={(e) => handleFieldChange("location", e.detail.value as string)}
              >
                <IonSelectOption className="customSelectOption" value="meinStandort">
                  Mein Standort
                </IonSelectOption>
                <IonSelectOption className="customSelectOption" value="mapStandort">
                  Auf der Karte wählen
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            {/* ----- Toggle Permanent/Temporary ----- */}
            <IonItem className="customItem">
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
                //onIonChange={(e) => handleFieldChange("dangerType", e.detail.value as string)}
              />
            </IonItem>

            {/* ----- Input Time ----- */}
            <IonItem className="customItem">
              <IonIcon icon={alarm} className="customIcon" />
              <IonSelect
                label="Wann ist der Vorfall passiert?"
                labelPlacement={"floating"}
                toggleIcon={caretDown}
                interface="popover"
                disabled={isChecked}
              >
                <IonSelectOption className="customSelectOption" value="timeNow">
                  In diesem Augenblick
                </IonSelectOption>
                <IonSelectOption className="customSelectOption" value="exactTime">
                  Uhrzeit wählen
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem className="customItem">
              <IonIcon icon={informationCircleOutline} className="customDescriptionIcon" />
              <IonTextarea
                className="customTextArea"
                label="Beschreibung?"
                labelPlacement={"floating"}
                placeholder="Beschreibe die Gefahrenstelle etwas näher"
                onIonChange={(e) => handleFieldChange("description", e.detail.value as string)}
              ></IonTextarea>

              {/* responseError && <p className="error-message">{responseError}</p> 
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  void handleDangerRequest(values)
                }}
              >
                {() => (
                  <Form>
                    <Input
                      multiline
                      className="customTextArea"
                      name="description"
                      label="Beschreibung"
                      placeholder="Beschreibe die Gefahrenstelle etwas näher"
                    />
                    <Field as="select" name="color">
                      <option value="red">Red</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                    </Field>
                  </Form>
                )}
              </Formik> */}
            </IonItem>
            <IonButton className="customButton" onClick={() => handleDangerRequest(formData)}>
              Gefahrenstelle melden
            </IonButton>
            {/* 
            <IonButton className="customButton" onClick={() => handleDangerRequest(testData)}>
              Gefahrenstelle melden
            </IonButton> */}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default CreateDangerTest
