import { IonButton, IonContent, IonHeader, IonList, IonModal, IonPage, IonTitle, IonToolbar, IonAvatar, IonImg, IonItem, IonLabel, IonInput, IonToggle } from '@ionic/react';
import './Tab3.css';
import { useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { exitOutline, notifications } from 'ionicons/icons';


const Tab3: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonButton id="open-modal" expand="block">
          Klick Tab
        </IonButton>
        <IonModal className='rounded-modal' ref={modal} trigger="open-modal" initialBreakpoint={0.92} breakpoints={[0.92]}>
          <IonContent className="ion-padding">
            <IonList >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IonAvatar style={{ width: '120px', height: '120px' }}>
                  <IonImg src="https://i.pravatar.cc/300?u=b" />
                </IonAvatar>
              </div>
              <p  className='distance'>Benachrichtigungen</p>
              <IonItem>
                <IonLabel> <IonIcon icon={notifications} size='small' color='primary'></IonIcon> Meine Benachrichtigungen <IonIcon name="chevron-forward"></IonIcon> </IonLabel>
              </IonItem>
              <p  className='distance'>Profileinstellungen</p>
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
              <IonIcon icon={exitOutline} size="default" color="primary" style={{ marginLeft: '5px' }}></IonIcon>
              </IonButton>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
