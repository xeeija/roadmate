import { IonButton, IonContent, IonHeader, IonList, IonModal, IonPage, IonTitle, IonToolbar, IonAvatar, IonImg, IonItem, IonLabel, IonInput, IonToggle, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonThumbnail, IonCardContent } from '@ionic/react';
import './Tab3.css';
import { useEffect, useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { exitOutline, notifications } from 'ionicons/icons';


const Tab3: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonPage>  
      <IonCard>
      <IonCardContent>
      <IonList >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IonAvatar style={{ width: '120px', height: '120px' }}>
                  <IonImg src="https://i.pravatar.cc/300?u=b" />
                </IonAvatar>
              </div>
          
              <IonItem>
                <IonLabel> <IonIcon icon={notifications} size='small' color='primary'></IonIcon> Meine Benachrichtigungen <IonIcon name="chevron-forward"></IonIcon> </IonLabel>
              </IonItem>    
              <p style={{ marginLeft: '12px', marginTop: '20px' }}>Profileinstellungen</p>
              <IonItem>
                <IonInput type='text' label="Username" labelPlacement="floating" fill="solid" placeholder="Helmie69" value="Helmie 69" disabled></IonInput>
              </IonItem>
              <br />
              <IonItem>
                <IonInput type='email' label="eMail" labelPlacement="floating" fill="solid" placeholder="michael@kohlmeier.de" value="michael@kohlmeier.de" disabled></IonInput>
              </IonItem>
              <br />
              <IonItem>
                <IonInput type='password' label="Passwort" labelPlacement="floating" fill="solid" placeholder="test1234" value="test1234" disabled></IonInput>
              </IonItem>
              <br />
              <IonItem>
                <IonInput type='password' label="Passwort wiederholen" labelPlacement="floating" fill="solid" placeholder="test1234" value="test1234" disabled></IonInput>
              </IonItem>
              <IonItem style={{ marginTop: '10px' }}>
                <IonToggle checked={true}>Benachrichtigungen zulassen</IonToggle>
               </IonItem>
              <br />
              <IonButton expand="block">Profil speichern</IonButton>
              <IonButton style={{ marginTop: '15px' }} fill='outline' expand="block">Logout
              <IonIcon icon={exitOutline} size="small" color="primary" style={{ marginLeft: '5px' }}></IonIcon>
              </IonButton>
            </IonList>
      </IonCardContent>
    </IonCard>
      
    </IonPage>
  );
};

export default Tab3;
