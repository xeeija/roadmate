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

import "./DangerAcute.css"
import { FC, useState } from "react"

// Missing props in interface: title, description, position, lastUpdate, status
interface DangerAcuteProps {
  closeModal: () => void
  addressName: string
  createdAt: Date
  isActive: boolean
  title: string
  description: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DangerAcute: FC<DangerAcuteProps> = ({ closeModal, addressName , createdAt, isActive, title, description}) => {
  const [isModalOpen] = useState(true)

  const quoteDate = JSON.stringify(createdAt).slice(1, 17);
  const [datePart, timePart] = quoteDate.split("T");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");

  const formattedDate = `${day}.${month}.${year} um ${hours}:${minutes} Uhr`;

  return (
    <>
      <IonModal isOpen={isModalOpen} animated={false}>
        <IonCard className="acute-danger-card" color="white">
          <IonCardHeader>
            <IonCardTitle className="acute-danger-title">{title ? title : "Gefahrenstelle"}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {description ? description : "Eine akute Gefahrenstelle."}
          </IonCardContent>

          <div className="description-list">
            <IonItem lines="full" className="ion-item-no-padding">
              <IonIcon icon={locationOutline} slot="start"></IonIcon>
              <p className="description-title">Position: &nbsp;</p>
              <p className="description">
                <b>{addressName ? addressName : "Unfall"}</b>
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
              <IonIcon icon={cogOutline} slot="start"></IonIcon>
              <p className="description-title">Status: &nbsp;</p>
              <p className="description">
                <b style={{ paddingLeft: "35px" }}> Aktiv</b>
              </p>
              <div className="status"></div>
            </IonItem>
          </div>

          <div className="acute-danger-buttons">
            <IonButton className="acute-danger-button" fill="clear">
              Als behoben melden
            </IonButton>
            <IonButton className="acute-danger-button" fill="clear" onClick={closeModal}>
              Schließen
            </IonButton>
          </div>
        </IonCard>
      </IonModal>
    </>
  )
}

export default DangerAcute
