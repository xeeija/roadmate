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

interface DangerAcuteProps {
  closeModal: () => void
}

const DangerAcute: FC<DangerAcuteProps> = ({ closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <>
      <IonModal isOpen={isModalOpen} animated={false}>
        <IonCard className="acute-danger-card" color="white">
          <IonCardHeader>
            <IonCardTitle className="acute-danger-title">Unfall</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Auffahrunfall zweier Autos, Straße nur in eine Richtung befahrbar.
          </IonCardContent>

          <div className="description-list">
            <IonItem lines="none">
              <IonIcon icon={locationOutline} slot="start"></IonIcon>
              <p className="description-title">Position: &nbsp;</p>
              <p className="description">Reitschulgasse 12</p>
            </IonItem>

            <IonItem lines="none">
              <IonIcon icon={timeOutline} slot="start"></IonIcon>
              <p className="description-title">Letzte Meldung: &nbsp;</p>
              <p className="description">27.10.2023 um 15:00 Uhr</p>
            </IonItem>

            <IonItem lines="none">
              <IonIcon icon={cogOutline} slot="start"></IonIcon>
              <p className="description-title">Status: &nbsp;</p>
              <p className="description">Aktiv</p>
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
