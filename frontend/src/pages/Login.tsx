import { IonButton, IonCard, IonCardContent, IonContent, IonPage, IonText } from "@ionic/react"
import { Form, Formik } from "formik" //Formik: https://formik.org/docs
import { FC, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import * as yup from "yup"
import { Input } from "../components/Input"
import logo from "../resources/logo/Logo1.svg"
import AppStorage from "../services/AppStorage"
import { AuthService } from "../services/AuthService"
import "./Onboarding.css"

interface LoginData {
  email: string
  password: string
}

const Login: FC = () => {
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

  const initialValues: LoginData = {
    email: "",
    password: "",
  }

  const handleLogin = async (loginData: LoginData) => {
    // console.log(loginData)

    try {
      const response = await authService.login(loginData)

      const data = response?.data
      const jwtStore = new AppStorage()
      if (data) {
        setResponseError(undefined)
        // console.log(data)

        await jwtStore.set("jwt_token", data.authentication)
        await jwtStore.set("user", data.user)

        history.push("/homescreen")
      }
    } catch (error) {
      setResponseError("Ungültige E-Mail-Adresse oder Passwort. Bitte versuche es erneut.")
      console.error("Login error", error)
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
                void handleLogin(values)
              }}
            >
              {() => (
                <Form>
                  {/* email input */}
                  <Input name="email" type="email" label="Email" placeholder="your@email.com" />

                  {/* password input */}
                  <Input name="password" type="password" label="Password" />

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
