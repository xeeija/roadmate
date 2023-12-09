/* tslint:disable */
/* eslint-disable */

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

import { useHistory } from "react-router-dom"
import { useState } from "react"

//Formik: https://formik.org/docs
import { Formik } from "formik"
import * as yup from "yup"

import AppStorage from "../services/AppStorage"
import { AuthService } from "../services/AuthService"

import logo from "../resources/logo/Logo1.svg"
import "./Onboarding.css"

const Register: React.FC = () => {
  const history = useHistory()

  // AUTH SERVICE AND REGISTER
  const authService = new AuthService()
  const [responseError, setResponseError] = useState<string>()

  // Validation Schema for the register form
  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, "Der Benutzername muss mindestens 3 Zeichen lang sein")
      .required("Benutzername ist erforderlich"),
    email: yup
      .string()
      .email("Bitte eine gültige E-Mail-Adresse eingeben")
      .required("E-Mail-Adresse ist erforderlich"),
    password_1: yup
      .string()
      .min(6, "Das Passwort muss mindestens 6 Zeichen lang sein")
      .required("Passwort ist erforderlich"),
    password_2: yup
      .string()
      .oneOf([yup.ref("password_1")], "Passwörter müssen übereinstimmen")
      .required("Passwortwiederholung ist erforderlich"),
  })

  const handleRegister = async (values: any) => {
    const { username, email, password_1, isExpert, description } = values

    const registerData = {
      username,
      email,
      password: password_1,
      requestExpert: isExpert,
      expertDescription: isExpert ? description : "",
    }
    //console.log(registerData)

    authService
      .register(registerData)
      .then((response: any) => {
        const data = response?.data
        const jwtStore = new AppStorage()
        if (data) {
          setResponseError("")
          jwtStore.set("jwt_token", data.authentication)
          jwtStore.set("user", data.user)
          history.push(`/homescreen`)
        }
      })
      .catch((error: any) => {
        setResponseError("Ungültige Daten. Bitte überprüfen Sie Ihre Eingaben.")
        console.log(error.errorMessages)
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
              initialValues={{
                username: "",
                email: "",
                password_1: "",
                password_2: "",
                isExpert: false,
                description: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                //console.log(values)
                handleRegister(values)
              }}
            >
              {(formikProps) => (
                <form onSubmit={formikProps.handleSubmit}>
                  {/* username input */}
                  <IonItem color="white" lines="inset" id="usernameField">
                    <IonInput
                      className="color-text"
                      type="text"
                      id="usernameInput"
                      label="Username"
                      labelPlacement="floating"
                      placeholder="Enter Username"
                      clearInput={true}
                      name="username"
                      value={formikProps.values.username}
                      onIonChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    ></IonInput>
                  </IonItem>
                  <p className="error-message">
                    {formikProps.touched.username && formikProps.errors.username}
                  </p>

                  {/* email input */}
                  <IonItem color="white" lines="inset" id="emailField">
                    <IonInput
                      className="color-text"
                      type="email"
                      id="emailInput"
                      label="E-Mail"
                      labelPlacement="floating"
                      placeholder="Enter E-Mail"
                      clearInput={true}
                      name="email"
                      value={formikProps.values.email}
                      onIonChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    ></IonInput>
                  </IonItem>
                  <p className="error-message">
                    {formikProps.touched.email && formikProps.errors.email}
                  </p>

                  {/* password_1 input */}
                  <IonItem color="white" lines="inset" id="password1_Field">
                    <IonInput
                      className="color-text"
                      type="password"
                      id="password1_Input"
                      label="Passwort"
                      labelPlacement="floating"
                      placeholder="Enter Password"
                      clearInput={true}
                      name="password_1"
                      value={formikProps.values.password_1}
                      onIonChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    ></IonInput>
                  </IonItem>
                  <p className="error-message">
                    {formikProps.touched.password_1 && formikProps.errors.password_1}
                  </p>

                  {/* password_2 input */}
                  <IonItem color="white" lines="inset" id="password2_Field">
                    <IonInput
                      className="color-text"
                      type="password"
                      id="password2_Input"
                      label="Passwort wiederholen"
                      labelPlacement="floating"
                      placeholder="Enter Password"
                      clearInput={true}
                      name="password_2"
                      value={formikProps.values.password_2}
                      onIonChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    ></IonInput>
                  </IonItem>
                  <p className="error-message">
                    {formikProps.touched.password_2 && formikProps.errors.password_2}
                  </p>

                  {/* isExpert checkbox */}
                  <IonItem color="white" lines="none" id="isExpert_Field">
                    <IonCheckbox
                      justify="space-between"
                      className="checkbox"
                      checked={formikProps.values.isExpert}
                      onIonChange={(e) => {
                        formikProps.setFieldValue("isExpert", e.detail.checked) // Manually update Formik's state for description field
                      }}
                    >
                      Als Experte registrieren
                    </IonCheckbox>
                  </IonItem>

                  {formikProps.values.isExpert && (
                    <IonItem color="white" lines="none">
                      <IonInput
                        className="expert-description"
                        type="text"
                        label="Warum bist du ein Experte?"
                        labelPlacement="floating"
                        placeholder="Describe your expertise"
                        name="description"
                        value={formikProps.values.description}
                        onIonChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      ></IonInput>
                    </IonItem>
                  )}

                  <IonButton
                    expand="block"
                    size="small"
                    className="login-button lowercase"
                    type="submit"
                  >
                    <IonText>Registrieren</IonText>
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
