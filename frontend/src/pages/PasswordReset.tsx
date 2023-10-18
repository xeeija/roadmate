import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react";

import { useState } from "react";

import logo from "../theme/Logo 1.svg";

import "./Onboarding.css";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <IonPage>
      <IonContent>
        <div className="background">
          <IonCard className="onboarding-menu center-bottom">
            <div className="logo-container">
              <img alt="RoadMate Logo" className="logo" src={logo} />
            </div>

            <IonCardContent>
              <IonItem color="white" lines="none">
                <IonText>Setzen Sie hier Ihr Passwort zurück:</IonText>
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
