import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react"
import { FC, useContext, useEffect, useState } from "react"
import DangerAcute from "../components/DangerAcute"
import Notification from "../components/Notification"
import { UserContext } from "../components/ProtectedRoute"
import ToolBar from "../components/navigation/ToolBar"
import { NotificationService } from "../services/api/NotificationService"
import { NotificationListItemResponseModel } from "../services/entities/response/NotificationListItemResponseModel"
import "./Notifications.css"

const Notifications: FC = () => {
  //The following code is for the AcuteDanger modal
  //const userService = new UserService()
  const [showModal, setShowModal] = useState(false)
  const [notifications, setNotifications] = useState<NotificationListItemResponseModel[]>([])
  const { currentUserToken } = useContext(UserContext)
  const notificationService = new NotificationService()

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserToken) {
        try {
          const response = await notificationService.notificationGET2(currentUserToken)
          setNotifications(
            response.data?.map((notification) => ({
              ...notification,
              description: notification.description || "",
              readAt: new Date(notification.readAt as Date),
            })) || []
          )
        } catch (error) {
          console.error("Failed to fetch notifications:", error)
        }
      }
    }
    void fetchData()
  }, [currentUserToken, notificationService])

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
            <IonList style={{ color: "white" }}>
              {notifications.map((notification, index) => (
                <Notification
                  key={index}
                  name={notification.description}
                  date={new Date(notification.readAt ?? "")}
                  route="Arbeitsweg"
                  id={index}
                />
              ))}
              {/* Test DangerAcute Component */}
              <IonButton onClick={openModal}>Akute Gefahrenstelle öffnen</IonButton>
              {showModal && (
                <DangerAcute
                  closeModal={closeModal}
                  addressName={"Adress"}
                  createdAt={new Date(Date.now())}
                  isActive={true}
                  title={"Title"}
                  description={"Description"}
                />
              )}
            </IonList>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Notifications
