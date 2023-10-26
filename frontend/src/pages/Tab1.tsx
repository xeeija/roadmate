import {IonButton, IonContent, IonIcon, IonPage} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {warningSharp} from "ionicons/icons";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ExploreContainer name="Tab 1 page" />
        <IonButton className="createDangerButton" ><a href="/createDanger" style={{ color: 'white', textDecoration: 'none' }}><IonIcon icon={warningSharp} className="createDangerIcon" /></a></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
