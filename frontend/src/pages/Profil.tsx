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
import "./Profil.css"
import { IonIcon } from "@ionic/react"
import { chevronForward, exitOutline, notifications } from "ionicons/icons"
import ToolBar from "../components/navigation/ToolBar"
import { FC, createContext, useContext, useEffect, useState } from "react"
import { UserService } from "../services/api/UserService"
import { useParams } from "react-router-dom"
import { User } from "../services/entities/User"
import { UserContext } from "../components/ProtectedRoute"
import AppStorage from "../services/AppStorage"

const Profil: FC = () => {
  const userService = new UserService()
  //const imageService = new ImageService();

  type URLParams = {
    profileUserId?: string
  }
  let { profileUserId } = useParams<URLParams>()
  const [profileUser, setProfileUser] = useState<any>()
  //const [imageUri, setImageUri] = useState<string>('');
  const userContext = useContext(UserContext)
  const currentUserToken = userContext.currentUserToken
  const currentUserId = userContext.currentUser?.id
  const jwtStore = new AppStorage()

  useEffect(() => {
    const fetchData = async () => {
      //let profileUserId = "b1c945ed-61fe-4167-b128-1177f0d0cefd"
      //let currentUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJiMWM5NDVlZC02MWZlLTQxNjctYjEyOC0xMTc3ZjBkMGNlZmQiLCJlbWFpbCI6ImNoZWZAY2hlZi5jaGVmIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2OTkxMTUxODUsImV4cCI6MTY5OTIwMTU4NSwiaWF0IjoxNjk5MTE1MTg1LCJpc3MiOiJodHRwOi8vcm9hZG1hdGUuY29tIiwiYXVkIjoiaHR0cDovL3JvYWRtYXRlLmNvbSJ9.txPgRnuD9zkKPwUMjWMeyG7JuIzttLJckLXXYNmMgxY"
      //debugger
      console.log(userContext)
      //console.log(await jwtStore.get("user"))
      if (currentUserId && currentUserToken) {
        try {
          const userResponse = await userService.userGET(currentUserId, currentUserToken)
          setProfileUser(userResponse?.data)
          console.log(userResponse?.data)
        } catch (error) {
          //console.log(error)
        }
      }
      //console.log('Pimpi')
    }

    fetchData()
  }, [])


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
                  value={profileUser?.username}
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
                  value={profileUser?.email}
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
                  value="********"
                  disabled
                ></IonInput>
              </IonItem>
              <br />
            
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

export default Profil
