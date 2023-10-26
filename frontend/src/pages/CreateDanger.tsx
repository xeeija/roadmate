import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader, IonIcon,
  IonInput,
  IonItem,
  IonPage, IonSelect, IonTextarea, IonToggle,
} from '@ionic/react';
import ToolBar from "../components/navigation/ToolBar";
import './CreateDanger.css'
import {
  alarm,
  caretDown,
  hammer,
  informationCircleOutline,
  locationSharp,
  warningSharp
} from "ionicons/icons";


const CreateDanger: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <ToolBar title="Melden" />
      </IonHeader>
      <IonContent fullscreen>
        <IonCard color="light" className="customCard" >
          <IonCardContent>
            <IonItem className="customItem">
              <IonIcon icon={warningSharp} className="customIcon"/>
              <IonSelect
                label="Art der Gefahrenstelle"
                labelPlacement={"floating"}
                toggleIcon={caretDown}
                interface="popover"
              >
              </IonSelect>
            </IonItem>
            <IonItem  className="customItem">
              <IonIcon icon={locationSharp} className="customIcon"/>
              <IonSelect
                label="Wo ist die Gefahrenstelle"
                labelPlacement={"floating"}
                toggleIcon={caretDown}
                interface="popover"
              >
              </IonSelect>
            </IonItem>
            <IonItem className="customItem">
              <IonIcon icon={hammer} className="customIcon"/>
              <IonInput
                label="Permanente Gefahrenstelle?"
                labelPlacement={"floating"}
              >
              </IonInput>
              <IonToggle className="customToggle custom-toggle-input" />
            </IonItem>
            <IonItem className="customItem">
              <IonIcon icon={alarm} className="customIcon"/>
              <IonSelect
                label="Wann ist der Vorfall passiert?"
                labelPlacement={"floating"}
                toggleIcon={caretDown}
                interface="popover"
              >
              </IonSelect>
            </IonItem>
            <IonItem className="customItem">
              <IonIcon icon={informationCircleOutline} className="customIcon"/>
              <IonTextarea
                label="Beschreibung?"
                labelPlacement={"floating"}

              >
              </IonTextarea>
            </IonItem>
            <IonButton className="customButton">Gefahrenstelle melden</IonButton>
          </IonCardContent>

        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CreateDanger;
