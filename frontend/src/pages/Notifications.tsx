import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react"

import DangerAcute from "../components/DangerAcute"
import Notification from "../components/Notification"
import ToolBar from "../components/navigation/ToolBar"

import { FC, useContext, useEffect, useState } from "react"
import "./Notifications.css"
import { NotificationListItemResponseModel } from "../services/entities/response/NotificationListItemResponseModel"
import { UserContext } from "../components/ProtectedRoute"
import { NotificationService } from "../services/api/NotificationService"

const Notifications: FC = () => {
  //The following code is for the AcuteDanger modal
  //const userService = new UserService()
  const [showModal, setShowModal] = useState(false)
  const [notifications, setNotifications] = useState<NotificationListItemResponseModel[]>([]);
  const { currentUserToken } = useContext(UserContext)
  const notificationService = new NotificationService();

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
          const response = await notificationService.notificationGET2(currentUserToken);
          setNotifications(response.data?.map(notification => ({
            ...notification,
            description: notification.description || "",
            readAt: new Date(notification.readAt as Date)
          })) || []);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      }
    }
    void fetchData();
  }, [currentUserToken, notificationService])

  return (
    <IonPage>
      <IonContent>
        <div className="toolbar-container">
          <ToolBar title="Karte" />
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
              {showModal && <DangerAcute closeModal={closeModal} />}
            </IonList>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Notifications
