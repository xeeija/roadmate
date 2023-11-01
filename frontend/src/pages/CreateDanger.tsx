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
import ToolBar from "../components/navigation/ToolBar"
import "./CreateDanger.css"
import {
  alarm,
  caretDown,
  hammer,
  informationCircleOutline,
  locationSharp,
  warningSharp,
} from "ionicons/icons"
import { useState } from "react"

const CreateDanger: React.FC = () => {
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
            <IonItem className="customItem">
              <IonIcon icon={warningSharp} className="customIcon" />
              <IonSelect
                label="Art der Gefahrenstelle"
                labelPlacement={"floating"}
                toggleIcon={caretDown}
                interface="popover"
              >
                <IonSelectOption className="customSelectOption" value="unfall">
                  Unfall
                </IonSelectOption>
                <IonSelectOption className="customSelectOption" value="block">
                  Klimakleber
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem className="customItem">
              <IonIcon icon={locationSharp} className="customIcon" />
              <IonSelect
                label="Wo ist die Gefahrenstelle"
                labelPlacement={"floating"}
                toggleIcon={caretDown}
                interface="popover"
              >
                <IonSelectOption className="customSelectOption" value="meinStandort">
                  Mein Standort
                </IonSelectOption>
                <IonSelectOption className="customSelectOption" value="mapStandort">
                  Auf der Karte wählen
                </IonSelectOption>
              </IonSelect>
            </IonItem>
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
              />
            </IonItem>

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
              ></IonTextarea>
            </IonItem>
            <IonButton className="customButton">Gefahrenstelle melden</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default CreateDanger
