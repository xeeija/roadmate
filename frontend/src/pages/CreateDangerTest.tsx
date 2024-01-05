/* tslint:disable */
/* eslint-disable */

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
import { hammer, informationCircleOutline } from "ionicons/icons"
import { FC, useState } from "react"
import ToolBar from "../components/navigation/ToolBar"
import "./CreateDanger.css"
import { Form, Formik } from "formik" //Formik: https://formik.org/docs
import * as yup from "yup"
import { Select } from "../components/Select"
import { Input } from "../components/Input"

// Added: Components Formik (DangerRequestData, validationSchema, initialValues)
interface DangerRequestData {
  userId: string
  lat: string
  lon: string
  categoryId: string
  timestamp: Date
  description?: string
}

const validationSchema = yup.object({
  description: yup.string(),
})

const initialValues: DangerRequestData = {
  userId: "1",
  lat: "1",
  lon: "1",
  categoryId: "1",
  timestamp: new Date(),
  description: "",
}

const handleDangerRequest = async (dangerRequestData: DangerRequestData) => {
  try {
    //Create DangerRequest Data
    console.log(dangerRequestData)
  } catch (error) {
    console.error("Danger Request error", error)
  }
}

const CreateDanger: FC = () => {
  const [isChecked, setIsChecked] = useState(false)
  const handleToggleChange = () => {
    setIsChecked(!isChecked)
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
                //console.log(values)
                void handleDangerRequest(values)
              }}
            >
              <Form>
                {/* Select Danger Category */}
                <Select
                  name="categoryId"
                  label="Art der Gefahrenstelle"
                  icon={true}
                  iconName="warningSharp"
                  className="customItem"
                  //Hier CategoryId hinein mappen
                  options={[
                    { value: "123", label: "Unfall" },
                    { value: "456", label: "Klimakleber" },
                    { value: "789", label: "Fette Kuh" },
                  ]}
                />

                {/* Select Danger Location */}

                <Select
                  name="dangerLocation"
                  label="Wo ist die Gefahrenstelle"
                  icon={true}
                  iconName="locationSharp"
                  className="customItem"
                  options={[
                    { value: "myLocation", label: "Mein Standort" },
                    { value: "otherLocation", label: "Auf der Karte wählen" },
                  ]}
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
                  icon={true}
                  iconName="alarm"
                  className="customItem"
                  options={[
                    { value: "a", label: "In diesem Augenblick" },
                    { value: "b", label: "Uhrzeit wählen" },
                  ]}
                />

                {/* Input Description */}
                <div className="customItem textArea">
                  <IonIcon icon={informationCircleOutline} className="customDescriptionIcon" />
                  <Input
                    multiline
                    color="white"
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

export default CreateDanger
