import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToggle,
} from "@ionic/react"
import { chevronForward, exitOutline, notifications } from "ionicons/icons"
import { FC, useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { UserContext } from "../components/ProtectedRoute"
import ToolBar from "../components/navigation/ToolBar"
import AppStorage from "../services/AppStorage"
import { UserService } from "../services/api/UserService"
import { User } from "../services/entities/User"
import "./Profil.css"
import { Link } from "react-router-dom"

const Profile: FC = () => {
  const userService = new UserService()
  //const imageService = new ImageService();

  const [profileUser, setProfileUser] = useState<User>()
  //const [imageUri, setImageUri] = useState<string>('');
  const { currentUserToken, currentUser } = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.id && currentUserToken) {
        try {
          const userResponse = await userService.userGET(currentUser.id, currentUserToken)
          setProfileUser(userResponse?.data)
          console.log(userResponse?.data)
        } catch (error) {
          console.error("error fetching user", error)
        }
      }
    }

    void fetchData()
  }, [])

  const history = useHistory()

  const handleLogout = async () => {
    const jwtStore = new AppStorage()
    await jwtStore.remove("jwt_token")
    await jwtStore.remove("user")

    history.push("/login")
  }

  const saveProfile = async () => {
    if (!currentUserToken) {
      alert('You are not logged in');
      return;
    }
  
    try {
      // Call the API to update the user profile
      await userService.userPUT(profileUser?.id ?? '', profileUser, currentUserToken);
      // Show a success message
      alert('Profile updated successfully');
    } catch (error) {
      // Show an error message
      console.error(error);
      alert('An error occurred while updating the profile');
    }
  };

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
                  <IonImg
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${profileUser?.id}`}
                  />
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
                  />{" "}
                  Meine Benachrichtigungen{" "}

                  <Link to="/notifications">
                  <IonIcon
                    icon={chevronForward}
                    size="default"
                    color="primary"
                    style={{ marginLeft: "20px", verticalAlign: "middle" }}
                  />
                  </Link>
                </IonLabel>
              </IonItem>
              <p style={{ marginLeft: "12px", marginTop: "20px" }}>Profileinstellungen</p>
              <IonItem className="backgroundInput">
                <IonInput
                  type="text"
                  label="Username"
                  labelPlacement="floating"
                  placeholder="Helmi69"
                  value={profileUser?.username}
                  onIonChange={e => {
                    const updatedUser = { ...profileUser, username: e.detail.value! };
                    setProfileUser(updatedUser);
                  }}
                />
              </IonItem>
              <br />
              <IonItem className="backgroundInput">
                <IonInput
                  type="email"
                  label="Email"
                  labelPlacement="floating"
                  placeholder="helmi@roadmate.at"
                  value={profileUser?.email}
                  onIonChange={e => {
                    const updatedUser = { ...profileUser, email: e.detail.value! };
                    setProfileUser(updatedUser);
                  }}
                />
              </IonItem>
              <br />
              <IonItem className="backgroundInput">
                <IonInput
                  type="password"
                  label="Passwort"
                  labelPlacement="floating"
                  placeholder="Passwort"
                  value="********"
                  disabled
                />
              </IonItem>
              <br />

              <br />
              <IonItem className="backgroundInput">
                <IonToggle style={{ marginTop: "5px", marginBottom: "5px" }} checked={true}>
                  Benachrichtigungen zulassen
                </IonToggle>
              </IonItem>
              <br />
              <IonButton  onClick={saveProfile} style={{ marginBottom: "20px" }} className="buttonSize" expand="block">
                Profil speichern
              </IonButton>
              <IonButton
                className="buttonSize"
                fill="outline"
                expand="block"
                onClick={() => void handleLogout()}
              >
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

export default Profile
