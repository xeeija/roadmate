import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonAvatar,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonCard,
  IonCardContent,
} from "@ionic/react"
import "./Tab3.css"
import { IonIcon } from "@ionic/react"
import { chevronForward, exitOutline, notifications } from "ionicons/icons"
import ToolBar from "../components/navigation/ToolBar"

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <ToolBar title="Profil" />
      </IonHeader>
      <IonContent>
        <IonCard className="rounded-modal">
          <IonCardContent>
            <IonList>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IonAvatar style={{ width: "120px", height: "120px", marginBottom: "9px" }}>
                  <IonImg src="https://i.pravatar.cc/300?u=b" />
                </IonAvatar>
              </div>
              <IonItem className="backgroundInput" style={{ marginTop: "15px" }}>
                <IonLabel
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <IonIcon
                    icon={notifications}
                    size="default"
                    color="primary"
                    style={{ marginRight: "10px", verticalAlign: "middle" }}
                  ></IonIcon>{" "}
                  Meine Benachrichtigungen{" "}
                  <IonIcon
                    icon={chevronForward}
                    size="default"
                    color="primary"
                    style={{ marginLeft: "20px", verticalAlign: "middle" }}
                  ></IonIcon>
                </IonLabel>
              </IonItem>
              <p style={{ marginLeft: "12px", marginTop: "20px" }}>Profileinstellungen</p>
              <IonItem className="backgroundInput">
                <IonInput
                  type="text"
                  label="Username"
                  labelPlacement="floating"
                  placeholder="Helmie69"
                  value="Helmie 69"
                  disabled
                ></IonInput>
              </IonItem>
              <br />
              <IonItem className="backgroundInput">
                <IonInput
                  type="email"
                  label="eMail"
                  labelPlacement="floating"
                  placeholder="michael@kohlmeier.de"
                  value="michael@kohlmeier.de"
                  disabled
                ></IonInput>
              </IonItem>
              <br />
              <IonItem className="backgroundInput">
                <IonInput
                  type="password"
                  label="Passwort"
                  labelPlacement="floating"
                  placeholder="test1234"
                  value="test1234"
                  disabled
                ></IonInput>
              </IonItem>
              <br />
              <IonItem className="backgroundInput">
                <IonInput
                  type="password"
                  label="Passwort wiederholen"
                  labelPlacement="floating"
                  placeholder="test1234"
                  value="test1234"
                  disabled
                ></IonInput>
              </IonItem>
              <br />
              <IonItem className="backgroundInput">
                <IonToggle style={{ marginTop: "5px", marginBottom: "5px" }} checked={true}>
                  Benachrichtigungen zulassen
                </IonToggle>
              </IonItem>
              <br />
              <IonButton style={{ marginBottom: "20px" }} className="buttonSize" expand="block">
                Profil speichern
              </IonButton>
              <IonButton className="buttonSize" fill="outline" expand="block">
                Logout
                <IonIcon
                  icon={exitOutline}
                  size="small"
                  color="primary"
                  style={{ marginLeft: "5px" }}
                ></IonIcon>
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Tab3
