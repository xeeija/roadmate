/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonToast,
} from "@ionic/react"
import { Form, Formik } from "formik"
import { send, warningOutline } from "ionicons/icons"
import { FC, useContext, useEffect, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import Comment from "../components/Comment"
import { Input } from "../components/Input"
import { UserContext } from "../components/ProtectedRoute"
import ToolBar from "../components/navigation/ToolBar"
import { DangerService } from "../services/api/DangerService"
import { DangerMessageService } from "../services/api/MessageService"
import { Danger } from "../services/entities/Danger"
import { DangerMessage } from "../services/entities/DangerMessage"
import { DangerMessageRequest } from "../services/entities/request/DangerMessageRequest"
import "./DangerZones.css"

const DangerZones: FC = () => {
  const dangerService = new DangerService()
  const messageService = new DangerMessageService()

  const { currentUserToken, currentUser } = useContext(UserContext)

  const [danger, setDanger] = useState<Danger>()

  const [inputValue, setInputValue] = useState<string>("")
  const [showMore, setShowMore] = useState(false)

  const [presentToast, dismissToast] = useIonToast()

  const [renderMap, setRenderMap] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.id && currentUserToken) {
        try {
          const response = await dangerService.dangerWithMessagesGET(
            "becfdc3c-ab87-4ff3-aa09-dbea2f882bb1",
            currentUserToken
          )

          if (response.data) {
            setDanger(response.data)
            setRenderMap(true)
          } else {
            await presentToast({
              duration: 5000,
              position: "bottom",
              buttons: [{ text: "OK", handler: () => dismissToast() }],
              message: `Fehler: ${response.errorMessages?.join("\n")}`,
              color: "danger",
              icon: warningOutline,
            })
          }

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
          "becfdc3c-ab87-4ff3-aa09-dbea2f882bb1",
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
    void fetchComments()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const messageRequest: DangerMessageRequest = {
        message: inputValue,
        // referencedMessageId: "becfdc3c-ab87-4ff3-aa09-dbea2f882bb1",
      }

      const data = await messageService.messagePOST(
        "becfdc3c-ab87-4ff3-aa09-dbea2f882bb1", // replace with the actual dangerId
        messageRequest,
        currentUserToken || ""
      )

      console.log(data)

      // Clear the input field
      setInputValue("")
    } catch (error) {
      console.error("Failed to post question", error)
    }
  }

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

  const latDelta = 0.00065655287861
  const lonDelta = 0.000134937615081

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
              center={{
                lat: (danger?.lat ?? 47) - latDelta,
                lng: (danger?.lon ?? 15.4) - lonDelta,
              }}
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
              <h1 className="fontColors">{danger?.title}</h1>

              <p>{danger?.description}</p>

              <Formik
                initialValues={{
                  message: "",
                }}
                enableReinitialize={true}
                validateOnChange={true}
                onSubmit={async ({ message }) => {
                  //console.log(values)
                  try {
                    const response = await messageService.messagePOST(
                      "becfdc3c-ab87-4ff3-aa09-dbea2f882bb1", // replace with the actual dangerId
                      {
                        message,
                        // referencedMessageId
                      },
                      currentUserToken || ""
                    )

                    console.log(response)

                    // Clear the input field
                    setInputValue("")
                  } catch (error) {
                    console.error("Failed to post question", error)
                  }
                }}
              >
                {() => (
                  <Form>
                    <Input name="message" label="Stelle eine Frage...">
                      <IonButton type="submit" fill="clear" aria-label="Send">
                        <IonIcon slot="icon-only" icon={send} size="small" aria-hidden="true" />
                      </IonButton>
                    </Input>
                  </Form>
                )}
              </Formik>

              <h2 className="fontColors"> Letzte Fragen </h2>

              {/* {danger?.messages?.map((message, i) => (
                <Comment data={}></Comment>
                <div key={message.id}>
                  {message.message}
                </div>
              ))} */}

              <Comment
                data={(danger?.messages ?? [])
                  .filter((m) => m.referencedMessageId === null)
                  .map((message) => ({
                    date: message.createdAt?.toLocaleString() ?? "",
                    question: message.message ?? "",
                    username: message.id?.substring(0, 4) ?? "",
                    // avatarSrc: `https://api.dicebear.com/7.x/personas/svg?seed=${message.userId}&scale=150`,
                    avatarSrc: `https://api.dicebear.com/7.x/personas/svg?seed=${message.id}&scale=150`,
                  }))}
              />

              <Formik
                initialValues={{
                  answer: "",
                }}
                enableReinitialize={true}
                validateOnChange={true}
                onSubmit={async ({ answer }) => {
                  //console.log(values)
                  try {
                    const response = await messageService.messagePOST(
                      "becfdc3c-ab87-4ff3-aa09-dbea2f882bb1", // replace with the actual dangerId
                      {
                        message: answer,
                        // referencedMessageId
                      },
                      currentUserToken || ""
                    )

                    console.log(response)

                    // Clear the input field
                    setInputValue("")
                  } catch (error) {
                    console.error("Failed to post question", error)
                  }
                }}
              >
                {() => (
                  <Form>
                    <Input name={`answer-id`} label="Antwort...">
                      <IonButton type="submit" fill="clear" aria-label="Send">
                        <IonIcon slot="icon-only" icon={send} size="small" aria-hidden="true" />
                      </IonButton>
                    </Input>

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
                  </Form>
                )}
              </Formik>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default DangerZones
