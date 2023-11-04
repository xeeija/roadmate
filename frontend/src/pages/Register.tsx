import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonText,
} from "@ionic/react"

import AppStorage from "../services/AppStorage"
import { AuthService } from "../services/AuthService"

import { useHistory } from "react-router-dom"

import { useState } from "react"

import logo from "../resources/logo/Logo1.svg"

import "./Onboarding.css"

const Register: React.FC = () => {
  const history = useHistory()

  // USER SERVICE AND REGISTER
  const authService = new AuthService()
  const [responseError, setResponseError] = useState<string>()

  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState<string>("")
  const [password_1, setPassword_1] = useState<string>("")
  const [password_2, setPassword_2] = useState<string>("")
  // const [password, setPassword] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const [isExpert, setIsExpert] = useState<boolean>(false)

  const handleRegister = async () => {
    const registerData = {
      username: username,
      email: email,
      password: password_1,
      isExpert: isExpert,
      description: description,
    }

    authService
      .register(registerData)
      .then((response: any) => {
        const data = response?.data
        const jwtStore = new AppStorage()
        if (data) {
          setResponseError("")
          jwtStore.set("jwt_token", data.authenticationInformation)
          jwtStore.set("user", data.user)
          history.push(`/homescreen`)
        }
      })
      .catch((error: any) => {
        console.log(error)
        setResponseError(error.errorMessages)
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
                type="text"
                label="Username"
                labelPlacement="floating"
                placeholder="Enter Username"
                clearInput={true}
                name="username"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
              ></IonInput>
            </IonItem>

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
                value={password_1}
                onIonChange={(e) => setPassword_1(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem color="white" lines="inset">
              <IonInput
                className="color-text"
                type="password"
                label="Passwort wiederholen"
                labelPlacement="floating"
                placeholder="Enter Password again"
                clearInput={true}
                name="password"
                value={password_2}
                onIonChange={(e) => setPassword_2(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem color="white" lines="none">
              <IonCheckbox
                justify="space-between"
                className="checkbox"
                value={isExpert}
                onIonChange={(e) => setIsExpert(e.detail.checked)}
              >
                Als Experte registrieren
              </IonCheckbox>
            </IonItem>

            {isExpert && (
              <IonItem color="white" lines="none">
                <IonInput
                  className="expert-description"
                  type="text"
                  label="Warum bist du ein Experte?"
                  labelPlacement="floating"
                  placeholder="Describe your expertise"
                  name="description"
                  value={description}
                  onIonChange={(e) => setDescription(e.detail.value!)}
                ></IonInput>
              </IonItem>
            )}

            <IonButton
              expand="block"
              size="small"
              className="login-button lowercase"
              onClick={handleRegister}
            >
              <IonText>Registrieren</IonText>
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

export default Register
