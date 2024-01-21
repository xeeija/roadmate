import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonModal,
} from "@ionic/react"
import { cogOutline, locationOutline, timeOutline } from "ionicons/icons"
import { FC } from "react"
import "./DangerAcute.css"

// Missing props in interface: title, description, position, lastUpdate, status
interface DangerAcuteProps {
  title: string
  description: string
  addressName: string
  createdAt: Date
  isActive: boolean
  isOpen: boolean
  closeModal?: () => void
  onResolve?: () => void | Promise<void>
  hideResolve?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DangerAcute: FC<DangerAcuteProps> = ({
  title,
  description,
  addressName,
  createdAt,
  isActive,
  closeModal,
  onResolve,
  hideResolve = false,
  isOpen,
}) => {
  const quoteDate = JSON.stringify(createdAt).slice(1, 17)
  const [datePart, timePart] = quoteDate.split("T")
  const [year, month, day] = datePart.split("-")
  const [hours, minutes] = timePart.split(":")

  const formattedDate = `${day}.${month}.${year} um ${hours}:${minutes} Uhr`

  return (
    <>
      <IonModal isOpen={isOpen} animated={false}>
        <IonCard className="acute-danger-card" color="white">
          <IonCardHeader>
            <IonCardTitle className="acute-danger-title">
              {title ? title : "Gefahrenstelle"}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {description ? description : "Eine akute Gefahrenstelle."}
          </IonCardContent>

          <div className="description-list">
            <IonItem lines="full" className="ion-item-no-padding">
              <IonIcon icon={locationOutline} slot="start"></IonIcon>
              <p className="description-title">Position: &nbsp;</p>
              <p className="description">
                <b>{addressName ? addressName : "Hauptstraße 42"}</b>
              </p>
            </IonItem>

            <IonItem lines="full">
              <IonIcon icon={timeOutline} slot="start"></IonIcon>
              <p className="description-title">Letzte Meldung: &nbsp;</p>
              <p className="description">
                <b>{formattedDate ? formattedDate : ""}</b>
              </p>
            </IonItem>

            {/*
            <IonItem lines="full" className="ion-item-no-padding">
              <IonIcon icon={locationOutline} slot="start"></IonIcon>
              <p className="description-title">
                Letzte Meldung: &nbsp;
                <b>27.10.2023 um 15:00 Uhr</b>
              </p>
            </IonItem>
            */}

            <IonItem lines="none">
              <IonIcon icon={cogOutline} slot="start" />
              <p className="description-title">Status:</p>
              <div
                style={{ marginLeft: "32px" }}
                className={`status ${isActive ? "status-active" : "status-resolving"}`}
              />
              <p className="description" style={{ marginLeft: "8px" }}>
                <b>{isActive ? "Aktiv" : "Auflösend"}</b>
                {/* <b>{"Aktiv"}</b> */}
              </p>
            </IonItem>
          </div>

          <div className="acute-danger-buttons">
            {!hideResolve && (
              <IonButton
                className="acute-danger-button"
                fill="clear"
                onClick={() => void onResolve?.()}
              >
                Als behoben melden
              </IonButton>
            )}
            <IonButton
              className="acute-danger-button"
              fill="clear"
              onClick={() => {
                console.log("Closing modal")
                // setisModalOpen(false);
                closeModal?.()
              }}
            >
              Schließen
            </IonButton>
          </div>
        </IonCard>
      </IonModal>
    </>
  )
}

export default DangerAcute
