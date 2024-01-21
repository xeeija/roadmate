import {
  //IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react"
import { FC, useContext, useEffect, useState } from "react"
//import DangerAcute from "../components/DangerAcute"
import NotificationComponent from "../components/Notification"
import { UserContext } from "../components/ProtectedRoute"
import ToolBar from "../components/navigation/ToolBar"
import { NotificationService } from "../services/api/NotificationService"
import { Notification } from "../services/entities/Notification"
//import { NotificationListItemResponseModel } from "../services/entities/response/NotificationListItemResponseModel"
import "./Notifications.css"

const Notifications: FC = () => {
  //The following code is for the AcuteDanger modal
  //const userService = new UserService()

  const [notifications, setNotifications] = useState<Notification[]>([])
  const { currentUserToken, currentUser } = useContext(UserContext)

  useEffect(() => {
    const notificationService = new NotificationService()
    const fetchData = async () => {
      if (currentUserToken) {
        try {
          const response = await notificationService.notificationWithDanger(currentUserToken)
          if (response && response.data) {
            setNotifications(response.data.filter((n) => n.userId === currentUser?.id))
          }
        } catch (error) {
          console.error("Failed to fetch notifications:", error)
        }
      }
    }
    void fetchData()
  }, [currentUserToken])

  return (
    <IonPage>
      <IonContent>
        <div className="toolbar-container">
          <ToolBar title="Benachrichtigungen" />
        </div>

        <IonCard className="rounded-modal">
          <IonCardHeader>
            <IonText className="notifications-title">Benachrichtigungen</IonText>
          </IonCardHeader>

          <div className="notifications-list">
            <IonList style={{ color: "white", marginBottom: "1rem" }}>
              {notifications.map((notification) => (
                <NotificationComponent
                  key={notification.id}
                  title={notification.danger?.title ?? notification.danger?.description ?? ""}
                  address={notification.danger?.addressName ?? ""}
                  isActive={notification.danger?.isActive ?? false}
                  date={new Date(notification.createdAt ?? "")}
                  description={notification.description ?? ""}
                  //route={notification.danger?.addressName ?? ""}
                />
              ))}
            </IonList>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Notifications
