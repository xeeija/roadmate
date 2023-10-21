import React from 'react';
import {IonHeader, IonToolbar, IonButtons, IonBackButton} from '@ionic/react';
import './ToolBar.css';
import {caretBack} from "ionicons/icons";

interface ToolbarProps {
  title: string;
}

const ToolBar: React.FC<ToolbarProps> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar>
          <IonButtons slot="start" >
           <IonBackButton defaultHref="/" icon={caretBack} text="RoadMate" > </IonBackButton>
          </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default ToolBar;
