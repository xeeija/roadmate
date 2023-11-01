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

import { useState } from "react"

import logo from "../resources/logo/Logo1.svg"

import { Link } from "react-router-dom"
import "./Onboarding.css"

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  // const loginData = {
  //   email: email,
  //   password: password,
  // }

  return (
    <IonPage>
      <IonContent>
        <IonCard className="onboarding-menu center-bottom">
          <div className="logo-container">
            <img alt="RoadMate Logo" className="logo" src={logo} />
          </div>

          <IonCardContent>
            <IonItem color="white" lines="inset">
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

            <IonItem color="white" lines="inset">
              <IonInput
                className="color-text"
                type="password"
                label="Passwort"
                labelPlacement="floating"
                placeholder="Enter Password"
                clearInput={true}
                name="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <Link to={"/reset-password"} className="reset-password">
              Password vergessen?
            </Link>

            <br />

            <IonButton expand="block" size="small" className="login-button lowercase">
              <IonText>Login</IonText>
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
              routerLink="/register"
            >
              <IonText>Registrieren</IonText>
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Login
