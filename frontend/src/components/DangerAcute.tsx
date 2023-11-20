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
}

const DangerAcute: FC<DangerAcuteProps> = ({ closeModal }) => {
  const [isModalOpen] = useState(true)

  return (
    <>
      <IonModal isOpen={isModalOpen} animated={false}>
        <IonCard className="acute-danger-card" color="white">
          <IonCardHeader>
            <IonCardTitle className="acute-danger-title">Unfall: Reitschulgasse</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Auffahrunfall zweier Autos, Straße nur in eine Richtung befahrbar.
          </IonCardContent>

          <div className="description-list">
            <IonItem lines="full" className="ion-item-no-padding">
              <IonIcon icon={locationOutline} slot="start"></IonIcon>
              <p className="description-title">Position: &nbsp;</p>
              <p className="description">
                <b>Reitschulgasse 12</b>
              </p>
            </IonItem>

            <IonItem lines="full">
              <IonIcon icon={timeOutline} slot="start"></IonIcon>
              <p className="description-title">Letzte Meldung: &nbsp;</p>
              <p className="description">
                <b>27.10.2023 um 15:00 Uhr</b>
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
                <b style={{ paddingLeft: "35px" }}>Aktiv</b>
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
