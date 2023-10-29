import { IonContent, IonHeader, IonPage, IonCard, IonCardContent, IonItem, IonInput, IonGrid, IonRow, IonCol, IonIcon, IonAvatar, IonImg, IonLabel, IonButton } from '@ionic/react';
import './DangerZones.css'
import Comment from '../components/Comment';
import ToolBar from '../components/navigation/ToolBar';
import { arrowRedo, caretDown, caretUp, informationCircle, link } from 'ionicons/icons';
import { useState } from 'react';


const DangerZones: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showMore, setShowMore] = useState(false);
  const [answerValue, setAnswerValue] = useState<string>("");

  const commentData = [
    {
      avatarSrc: "https://i.pravatar.cc/300?u=b",
      username: "Alice",
      date: "03.06.2012",
      question: "Habe ich als Radfahrerin kommend von der Münzgrabenstraße Richtung Dietrichsteinplatz Vorrang gegenüber dem von links kommenden Verkehr aus der Grazbachgasse?",
    },

    {
      avatarSrc: "https://i.pravatar.cc/300?u=d",
      username: "David",
      date: "04.12.2022",
      question: "Hallo, wie ist das eigenltich wenn ich von der Reitschulgasse komme, wo die Bimschienen sind, an welcher Ampel muss ich mich da orientieren und wie darf ich fahren?",
    }
    // weitere Einträge....
  ];

  
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

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

    <Comment data={commentData.slice(0, showMore ? commentData.length : 1)} />
            
    {commentData.length > 1 && (
              <IonButton className='answer' expand="block" fill="clear" onClick={toggleShowMore}>
                Antworten
                <IonIcon icon={showMore ? caretUp : caretDown} size="small" slot='start' />
              </IonButton>
            )}
  
    <IonItem className='questionBackground'>
            <IonInput
              style={{ 'min-height': '10px' }}
              type='text'
              labelPlacement="stacked"
              clearInput={true}
              placeholder="Antwort..."
              value={inputValue}
              onIonChange={(e) => setInputValue(e.detail.value!)}
            ></IonInput>
           
      </IonItem> 

    </IonCardContent>
    </IonCard>
    </IonContent>
      
    </IonPage>
  );
};

export default DangerZones;
