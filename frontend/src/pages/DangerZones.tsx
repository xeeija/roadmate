/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
} from "@ionic/react"
import { caretDown, caretUp, link } from "ionicons/icons"
import { FC, useEffect, useState, useContext } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import Comment from "../components/Comment"
import ToolBar from "../components/navigation/ToolBar"
import "./DangerZones.css"
import { DangerMessageService } from "../services/api/MessageService"
import { DangerMessage } from "../services/entities/DangerMessage"
import { UserContext } from "../components/ProtectedRoute"
import { UserService } from "../services/api/UserService"
import { User } from "../services/entities/User"

const DangerZones: FC = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const [showMore, setShowMore] = useState(false)
  const userService = new UserService()
  const [profileUser, setProfileUser] = useState<User>()

  const { currentUserToken, currentUser } = useContext(UserContext)
  
  const [renderMap, setRenderMap] = useState(false)

  const messageService = new DangerMessageService()

  useEffect(() => {
    setRenderMap(true)
  })

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.id && currentUserToken) {
        try {
          const userResponse = await userService.userGET(currentUser.id, currentUserToken)
          setProfileUser(userResponse?.data)
          // console.log(userResponse?.data)
        } catch (error) {
          console.error("error fetching user", error)
        }
      }
    }

    void fetchData()
  }, [])

  // Add a state variable for the comments
  const [comments, setComments] = useState<DangerMessage>()
  //console.log(comments);

  // Define a function to fetch the comments
  const fetchComments = async () => {
    if (currentUser?.id && currentUserToken) {
      try {
        const data = await messageService.messageGET(
          "e45326df-e18d-4a66-a40d-7cc53113ee64",
          currentUserToken || ""
        )
        //const data = await response.json()
        setComments(data as DangerMessage)
      } catch (error) {
        console.error("error fetching comments", error)
      }
    }
  }

  // Call the fetchComments function when the component mounts
  useEffect(() => {
    fetchComments()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const data = await messageService.messagePOST(
        "e45326df-e18d-4a66-a40d-7cc53113ee64", // replace with the actual dangerId
        { message: inputValue as DangerMessage }, // replace with the actual structure of DangerMessageRequest
        currentUserToken || ""
      );
  
      console.log(data);
  
      // Clear the input field
      setInputValue('');
    } catch (error) {
      console.error('Failed to post question', error);
    }
  };

  //Hardcoded Solution
  /*const commentData = [
    {
      avatarSrc: "https://i.pravatar.cc/300?u=b",
      username: "Alice",
      date: "03.06.2012",
      question:
        "Habe ich als Radfahrerin kommend von der Münzgrabenstraße Richtung Dietrichsteinplatz Vorrang gegenüber dem von links kommenden Verkehr aus der Grazbachgasse?",
    },

    {
      avatarSrc: "https://i.pravatar.cc/300?u=d",
      username: "David",
      date: "04.12.2022",
      question:
        "Hallo, wie ist das eigenltich wenn ich von der Reitschulgasse komme, wo die Bimschienen sind, an welcher Ampel muss ich mich da orientieren und wie darf ich fahren?",
    },
    // weitere Einträge....
  ]*/

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  const locationCenter = [47.06658740529705, 15.446622566627681]
  const latDelta = 0.00065655287861
  const lngDelta = 0.000134937615081

  const leafletOptions = {
    maxZoom: 20,
    attribution: `Datenquelle: <a href="https://www.basemap.at">basemap.at</a>`,
    type: "normal",
    format: "png",
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolBar title="Forum" />
      </IonHeader>
      <IonContent>
        {renderMap && (
          <div id="map" style={{ zIndex: 0 }}>
            <MapContainer
              center={{ lat: locationCenter[0] - latDelta, lng: locationCenter[1] - lngDelta }}
              zoom={18}
              zoomControl={false}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
              dragging={false}
              doubleClickZoom={false}
            >
              <TileLayer
                url="https://mapsneu.wien.gv.at/basemap/geolandbasemap/{type}/google3857/{z}/{y}/{x}.{format}"
                {...leafletOptions}
              />
            </MapContainer>
          </div>
        )}
        <div style={{ zIndex: 1 }}>
          <IonCard style={{ marginTop: "-100%" }} className="rounded-card">
            <IonCardContent>
              <h1 className="fontColors">Dietrichsteinplatz</h1>
              <h3 style={{ marginTop: "15px" }}>Problemstellung</h3>
              <p>
                Der Dietrichsteinplatz in der Grazer Innenstadt ist ein gefährlicher
                Verkehrsknotenpunkt, besonders für Radfahrerinnen. Die unübersichtliche
                Straßenführung sorgt, gemeinsam mit der hohen Frequentierung für eine große
                Gefahrenstelle mit hohem Unfallpotential.
              </p>

              <form onSubmit={handleSubmit}>
              <IonItem className="questionBackground">
                <IonInput
                  style={{ minHeight: "10px" }}
                  type="text"
                  labelPlacement="stacked"
                  clearInput={true}
                  placeholder="Eine Frage stellen ..."
                  value={inputValue}
                  onIonChange={(e) => setInputValue(e.detail.value!)}
                ></IonInput>
                <IonButton type="submit">Submit</IonButton>
                <IonIcon className="icons" icon={link} size="small"></IonIcon>
              </IonItem>
              </form>
              <h2 className="fontColors"> Letzte Fragen </h2>

              

          {/*}    <Comment data={comments.slice(0, showMore ? comments.length : 1)} />

              <div>
                {comments.map((comment, index) => (
                  <p key={index}>{comment.message}</p>
                ))}
              </div>
                  
              

              {comments.length > 1 && (
                <IonButton className="answer" expand="block" fill="clear" onClick={toggleShowMore}>
                  Antworten
                  <IonIcon icon={showMore ? caretUp : caretDown} size="small" slot="start" />
                </IonButton>
              )}
          */}
              
              <IonItem className="questionBackground">
                <IonInput
                  style={{ minHeight: "10px" }}
                  type="text"
                  labelPlacement="stacked"
                  clearInput={true}
                  placeholder="Antwort..."
                  value={inputValue}
                  onIonChange={(e) => setInputValue(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default DangerZones
