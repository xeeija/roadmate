import {IonButton, IonContent, IonHeader, IonPage} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import ToolBar from "../components/navigation/ToolBar";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <ToolBar title="RoadMate" />
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer name="Tab 1 page" />
        <IonButton><a href="/createDanger" style={{ color: 'white', textDecoration: 'none' }}> Gefahrenstellen melden </a></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
