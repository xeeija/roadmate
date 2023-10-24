import { IonContent, IonHeader, IonPage, IonCard, IonCardContent, IonItem, IonInput, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import './Gefahrenstellen.css'

import ToolBar from '../components/navigation/ToolBar';
import { arrowRedo, informationCircle } from 'ionicons/icons';


const Gefahrenstellen: React.FC = () => {
  return (
    <IonPage>  
    <IonHeader>
        <ToolBar title="Forum" />
    </IonHeader>
    <IonContent>
    <IonCard style={ {marginTop: '200px'} } className='rounded-card' >
        
    <IonCardContent>
        <h1 className='colors'>Dietrichsteinplatz</h1>
        <h3 style={{ marginTop: '15px' }}>Problemstellung</h3>
        <p>Der Dietrichsteinplatz in der Grazer Innenstadt ist ein gefährlicher Verkehrsknotenpunkt, besonders für Radfahrerinnen. Die unübersichtliche Straßenführung sorgt, gemeinsam mit der hohen Frequentierung für eine große Gefahrenstelle mit hohem Unfallpotential.</p>

    <IonItem style={{ marginLeft: '-15px' }}>
        <IonInput
          labelPlacement="stacked"
          clearOnEdit={true}
          placeholder="Eine Frage stellen ...">
        </IonInput>
    </IonItem>

    <h2 className='colors'> Letzte Fragen </h2>

    <IonGrid>
        <IonRow>
          <IonCol size-md="6" className='colors'>Alice</IonCol>
          
          <IonCol className='date' size-md="6">03.06.2012
            <IonIcon className='icons' icon={informationCircle} size='small'></IonIcon>
            <IonIcon className='icons' icon={arrowRedo} size='small'></IonIcon>
          </IonCol>
          <IonCol size='12' size-sm='3'>
          <p>Habe ich als Radfahrerin kommend von der Münzgrabenstraße Richtung Dietrichsteinplatz Vorrang gegenüber dem von links kommenden Verkehr aus der Grazbachgasse?</p>
          </IonCol>
          
        </IonRow>
      </IonGrid>

    </IonCardContent>
    </IonCard>
    </IonContent>
      
    </IonPage>
  );
};

export default Gefahrenstellen;
