import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import './ToolBar.css';
import {arrowBack, caretBack, caretBackSharp, home} from "ionicons/icons";

interface ToolbarProps {
  title: string;
  backButton?: boolean;
  backAction?: () => void;
}

const ToolBar: React.FC<ToolbarProps> = ({ title, backButton, backAction }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={backAction}>
            <IonIcon slot="icon-only" icon={caretBack} />
          </IonButton>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default ToolBar;
