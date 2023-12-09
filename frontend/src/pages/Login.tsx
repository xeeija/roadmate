/* tslint:disable */
/* eslint-disable */

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

//Formik: https://formik.org/docs
import { Formik } from "formik"
import * as yup from "yup"

import AppStorage from "../services/AppStorage"
import { AuthService } from "../services/AuthService"

import logo from "../resources/logo/Logo1.svg"
import "./Onboarding.css"

const Login: React.FC = () => {
  const history = useHistory()

  // AUTH SERVICE UND LOGIN
  const authService = new AuthService()
  const [responseError, setResponseError] = useState<string>()

  // Validation Schema for the login form
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Bitte eine gültige E-Mail-Adresse eingeben")
      .required("E-Mail-Adresse ist erforderlich"),
    password: yup
      .string()
      .min(6, "Das Passwort muss mindestens 6 Zeichen lang sein")
      .required("Passwort ist erforderlich"),
  })

  const handleLogin = async (loginData: any) => {
    console.log(loginData)

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
        setResponseError("Ungültige E-Mail-Adresse oder Passwort. Bitte versuche es erneut.")
        //console.log(error.errorMessages)
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
            {responseError && <p className="error-message">{responseError}</p>}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleLogin(values)
              }}
            >
              {(formikProps) => (
                <form onSubmit={formikProps.handleSubmit}>
                  {/* email input */}
                  <IonItem color="white" lines="inset" id="emailField">
                    <IonInput
                      className="color-text"
                      type="email"
                      id="emailInput"
                      label="E-Mail"
                      labelPlacement="floating"
                      placeholder="Enter E-Mail"
                      name="email"
                      value={formikProps.values.email}
                      onIonChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    ></IonInput>
                  </IonItem>
                  <p className="error-message">
                    {formikProps.touched.email && formikProps.errors.email}
                  </p>

                  {/* password input */}
                  <IonItem color="white" lines="inset" id="passwordField">
                    <IonInput
                      className="color-text"
                      type="password"
                      id="passwordInput"
                      label="Passwort"
                      labelPlacement="floating"
                      placeholder="Enter Password"
                      name="password"
                      value={formikProps.values.password}
                      onIonChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    ></IonInput>
                  </IonItem>
                  <p className="error-message">
                    {formikProps.touched.password && formikProps.errors.password}
                  </p>

                  <Link to={"/reset-password"} className="reset-password">
                    Password vergessen?
                  </Link>

                  <br />

                  <IonButton
                    expand="block"
                    size="small"
                    className="login-button lowercase"
                    type="submit"
                  >
                    <IonText>Login</IonText>
                  </IonButton>
                </form>
              )}
            </Formik>

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
