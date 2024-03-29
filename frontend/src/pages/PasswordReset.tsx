import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonText,
} from "@ionic/react"
import { FC, useState } from "react"
import logo from "../resources/logo/Logo1.svg"
import "./Onboarding.css"

const ResetPassword: FC = () => {
  const [email, setEmail] = useState<string>("")

  return (
    <IonPage>
      <IonContent>
        <IonCard className="onboarding-menu center-bottom">
          <div className="logo-container">
            <img alt="RoadMate Logo" className="logo" src={logo} />
          </div>

          <IonCardContent>
            <IonItem color="white" lines="none">
              <IonText>
                <b>Passwort zurücksetzen</b>
              </IonText>
            </IonItem>

            <IonItem color="white" lines="none">
              <IonInput
                className="color-text"
                type="email"
                label="E-Mail"
                labelPlacement="floating"
                placeholder="Enter E-Mail"
                clearInput={true}
                name="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <br />

            <IonButton expand="block" size="small" className="login-button lowercase">
              <IonText>Passwort zurücksetzen</IonText>
            </IonButton>

            <div className="divider-container">
              <div className="divider"></div>
              <p style={{ fontSize: "12px" }}>oder</p>
              <div className="divider"></div>
            </div>

            <IonButton
              expand="block"
              size="small"
              fill="outline"
              className="register-button lowercase"
              routerLink="/login"
            >
              <IonText>Login</IonText>
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default ResetPassword
