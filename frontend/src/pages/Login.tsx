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
import { Link, useHistory } from "react-router-dom"

import AppStorage from "../services/AppStorage"
import { AuthService } from "../services/AuthService"

import logo from "../resources/logo/Logo1.svg"
import "./Onboarding.css"

/* tslint:disable */
/* eslint-disable */

const Login: React.FC = () => {
  const history = useHistory()

  // Variables for the login form
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // AUTH SERVICE UND LOGIN
  const authService = new AuthService()
  const [responseError, setResponseError] = useState<string>()

  const handleLogin = async () => {
    const loginData = {
      email: email,
      password: password,
    }

    //console.log(loginData)

    authService
      .login(loginData)
      .then((response: any) => {
        const data = response?.data
        const jwtStore = new AppStorage()
        if (data) {
          setResponseError("")
          console.log(data)
          jwtStore.set("jwt_token", data.authenticationInformation)
          jwtStore.set("user", data.user)
          history.push("/homescreen")
        }
      })
      .catch((error: any) => {
        setResponseError(error.errorMessages)
        console.log(responseError)
      })
  }

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

            <IonButton
              expand="block"
              size="small"
              className="login-button lowercase"
              onClick={() => handleLogin()}
              // Bug --> State wird erst nach Click aktualisiert
              // onClick={() => setTimeout(() => handleLogin(), 50)}
              // disabled={!email || !password}
            >
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
