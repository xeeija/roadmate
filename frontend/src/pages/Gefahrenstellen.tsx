import { IonContent, IonHeader, IonPage, IonCard, IonCardContent, IonItem, IonInput, IonGrid, IonRow, IonCol, IonIcon, IonAvatar, IonImg } from '@ionic/react';
import './Gefahrenstellen.css'

import ToolBar from '../components/navigation/ToolBar';
import { arrowRedo, informationCircle, link } from 'ionicons/icons';
import { useState } from 'react';


const Gefahrenstellen: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <IonPage>  
    <IonHeader>
        <ToolBar title="Forum" />
    </IonHeader>
    <IonContent>
    <IonCard style={ {marginTop: '200px'} } className='rounded-card' >
        
    <IonCardContent>
        <h1 className='fontColors'>Dietrichsteinplatz</h1>
        <h3 style={{ marginTop: '15px' }}>Problemstellung</h3>
        <p>Der Dietrichsteinplatz in der Grazer Innenstadt ist ein gefährlicher Verkehrsknotenpunkt, besonders für Radfahrerinnen. Die unübersichtliche Straßenführung sorgt, gemeinsam mit der hohen Frequentierung für eine große Gefahrenstelle mit hohem Unfallpotential.</p>

       
    <IonItem className='questionBackground' >
        <IonInput
          style={{ 'min-height': '10px' }}
          type='text'
          labelPlacement="stacked"
          clearInput={true}
          placeholder="Eine Frage stellen ..."
          value={inputValue}
          onIonChange={(e) => setInputValue(e.detail.value!)}
        ></IonInput>
        <IonIcon className='icons' icon={link} size='small'></IonIcon>
    </IonItem>

    <h2 className='fontColors'> Letzte Fragen </h2>

    <IonGrid>
    <div className='backgroundCard'>
        <IonRow style={{ marginLeft: '10px' }}>
          <IonCol size-md="6" className='fontColors' style={{ display: 'flex', alignItems: 'center' }}>
            <IonAvatar style={{ width: '25px', height: '25px', marginRight: '10px'}}>
                  <IonImg src="https://i.pravatar.cc/300?u=b" />
            </IonAvatar>
            Alice
          </IonCol>
          <IonCol className='date-icons' size-md="6">
            <span className='date'>03.06.2012</span>
            <IonIcon className='icons' icon={informationCircle} size='small'></IonIcon>
            <IonIcon className='icons' icon={arrowRedo} size='small'></IonIcon>
          </IonCol>
          <IonCol size='12' size-sm='3'>
            <p>Habe ich als Radfahrerin kommend von der Münzgrabenstraße Richtung Dietrichsteinplatz Vorrang gegenüber dem von links kommenden Verkehr aus der Grazbachgasse?</p>
          </IonCol> 
          <IonItem className='questionBackground' >
            <IonInput
              style={{ 'min-height': '10px' }}
              type='text'
              labelPlacement="stacked"
              clearInput={true}
              placeholder="Antwort..."
              value={inputValue}
              onIonChange={(e) => setInputValue(e.detail.value!)}
            ></IonInput>
            <IonIcon className='icons' icon={link} size='small'></IonIcon>
          </IonItem>
          <IonCol size-md="6" className='fontColors' style={{ display: 'flex', alignItems: 'center' }}>
            <IonAvatar style={{ width: '25px', height: '25px', marginRight: '10px'}}>
                  <IonImg src="https://i.pravatar.cc/300" />
            </IonAvatar>
            David
          </IonCol>
          <IonCol className='date-icons' size-md="6">
            <span className='date'>03.06.2012</span>
            <IonIcon className='icons' icon={informationCircle} size='small'></IonIcon>
            <IonIcon className='icons' icon={arrowRedo} size='small'></IonIcon>
          </IonCol>
          <IonCol size='12' size-sm='3'>
            <p>Habe ich als Radfahrerin kommend von der Münzgrabenstraße Richtung Dietrichsteinplatz Vorrang gegenüber dem von links kommenden Verkehr aus der Grazbachgasse?</p>
          </IonCol> 
        </IonRow>    
        </div>
        <br/>      
      </IonGrid>

    </IonCardContent>
    </IonCard>
    </IonContent>
      
    </IonPage>
  );
};

export default Gefahrenstellen;
