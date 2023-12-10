import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonItem,
  IonPage,
  IonText,
} from "@ionic/react"
import { Form, Formik } from "formik" //Formik: https://formik.org/docs
import { useState } from "react"
import { useHistory } from "react-router-dom"
import * as yup from "yup"
import { Input } from "../components/Input"
import logo from "../resources/logo/Logo1.svg"
import AppStorage from "../services/AppStorage"
import { AuthService } from "../services/AuthService"
import "./Onboarding.css"

interface RegisterData {
  username: string
  email: string
  password: string
  passwordConfirm: string
  isExpert: boolean
  description?: string
}

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
    password: yup
      .string()
      .min(6, "Das Passwort muss mindestens 6 Zeichen lang sein")
      .required("Passwort ist erforderlich"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Passwörter müssen übereinstimmen")
      .required("Passwortwiederholung ist erforderlich"),
  })

  const initialValues: RegisterData = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    isExpert: false,
    description: "",
  }

  const handleRegister = async (registerData: RegisterData) => {
    // const { username, email, password, isExpert, description } = registerData

    // const registerData = {
    //   username,
    //   email,
    //   password: password,
    //   requestExpert: isExpert,
    //   expertDescription: isExpert ? description : "",
    // }
    //console.log(registerData)

    try {
      const response = await authService.register(registerData)

      const data = response?.data
      const jwtStore = new AppStorage()
      if (data) {
        setResponseError("")
        await jwtStore.set("jwt_token", data.authentication)
        await jwtStore.set("user", data.user)
        history.push(`/homescreen`)
      }
    } catch (error) {
      setResponseError("Ungültige Daten. Bitte überprüfen Sie Ihre Eingaben.")
      console.error("Register error", error)
    }
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
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                //console.log(values)
                void handleRegister(values)
              }}
            >
              {({ values, isValid, dirty, getFieldProps, setFieldValue }) => (
                <Form>
                  {/* username input */}
                  <Input name="username" label="Username" />

                  {/* email input */}
                  <Input name="email" type="email" label="Email" placeholder="your@email.com" />

                  {/* password input */}
                  <Input name="password" type="password" label="Passwort" />

                  {/* passwordConfirm input */}
                  <Input name="passwordConfirm" type="password" label="Passwort wiederholen" />

                  {/* isExpert checkbox */}
                  <IonItem
                    color="white"
                    lines="none"
                    id="isExpert_Field"
                    style={{ marginTop: "1rem" }}
                  >
                    <IonCheckbox
                      justify="space-between"
                      className="checkbox"
                      {...getFieldProps("isExpert")}
                      onIonChange={(e) => {
                        // Manually update Formik's state for description field
                        void setFieldValue("isExpert", e.detail.checked)
                      }}
                    >
                      Als Experte registrieren
                    </IonCheckbox>
                  </IonItem>

                  {values.isExpert && (
                    <Input
                      multiline
                      name="description"
                      label="Warum bist du ein Experte?"
                      placeholder="Erzähl uns etwas über dich."
                      className="expert-description"
                    />
                  )}

                  <IonButton
                    expand="block"
                    size="small"
                    className="login-button lowercase"
                    type="submit"
                    disabled={!isValid || !dirty}
                  >
                    <IonText>Registrieren</IonText>
                  </IonButton>
                </Form>
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
