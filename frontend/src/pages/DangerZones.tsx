/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonText,
  useIonToast,
} from "@ionic/react"
import { Form, Formik } from "formik"
import { send, warningOutline } from "ionicons/icons"
import { FC, useContext, useEffect, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { useParams } from "react-router"
import { Comment } from "../components/Comment"
import { Input } from "../components/Input"
import { UserContext } from "../components/ProtectedRoute"
import ToolBar from "../components/navigation/ToolBar"
import { DangerService } from "../services/api/DangerService"
import { DangerMessageService } from "../services/api/MessageService"
import { Danger } from "../services/entities/Danger"
import { DangerItemResponseModel } from "../services/entities/response/DangerItemResponseModel"
import "./DangerZones.css"

type Params = {
  dangerId: string
}

const DangerZones: FC = () => {
  const dangerService = new DangerService()
  const messageService = new DangerMessageService()

  const { currentUserToken, currentUser } = useContext(UserContext)

  const [danger, setDanger] = useState<Danger>()

  const { dangerId } = useParams<Params>()
  const [presentToast, dismissToast] = useIonToast()

  const [renderMap, setRenderMap] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const fetchDanger = async () => {
    if (currentUser?.id && currentUserToken) {
      try {
        const response = await dangerService.dangerWithMessagesGET(dangerId, currentUserToken)

        if (response.data) {
          setDanger(response.data)
          setRenderMap(true)
        } else {
          const errorMessage = response.errorMessages?.join("\n") || "404 Not Found"

          // todo: refactor
          if (errorMessage === "404 Not Found") {
            setNotFound(true)
          }

          await presentToast({
            duration: 5000,
            position: "bottom",
            buttons: [{ text: "OK", handler: () => dismissToast() }],
            message: `Fehler: ${errorMessage}`,
            color: "danger",
            icon: warningOutline,
          })
        }

        // console.log(userResponse?.data)
      } catch (error) {
        const errorMessage = (error as Error)?.message
        const errorMessages = (error as DangerItemResponseModel)?.errorMessages?.join("\n")

        await presentToast({
          duration: 5000,
          position: "bottom",
          buttons: [{ text: "OK", handler: () => dismissToast() }],
          message: `Fehler: ${errorMessage ?? errorMessages}`,
          color: "danger",
          icon: warningOutline,
        })
        console.error("error fetching user:", error)
      }
    }
  }

  useEffect(() => {
    void fetchDanger()
  }, [])

  const messages = (danger?.messages ?? []).filter((m) => m.referencedMessageId === null)

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
      {renderMap && (
        <IonContent>
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

          <div style={{ zIndex: 1 }}>
            <IonCard style={{ marginTop: "-100%" }} className="rounded-card" color="light">
              <IonCardContent>
                <IonText color="tertiary">
                  <h1 style={{ marginBottom: "0.5rem" }}>{danger?.title}</h1>
                </IonText>

                <IonText color="dark">
                  <p style={{ marginBottom: "1rem" }}>{danger?.description}</p>
                </IonText>

                <Formik
                  initialValues={{
                    message: "",
                  }}
                  enableReinitialize={true}
                  validateOnChange={true}
                  onSubmit={async ({ message }, { resetForm }) => {
                    if (!message) {
                      return
                    }

                    try {
                      const response = await messageService.messagePOST(
                        dangerId,
                        { message },
                        currentUserToken || ""
                      )

                      console.log(response)

                      resetForm()

                      // Reload messages
                      await fetchDanger()
                    } catch (error) {
                      console.error("Failed to post question", error)
                    }
                  }}
                >
                  {() => (
                    <Form>
                      <Input name="message" label="Stelle eine Frage..." className="message-input">
                        <IonButton type="submit" fill="clear" aria-label="Send" id="question-input">
                          <IonIcon
                            slot="icon-only"
                            color="tertiary"
                            icon={send}
                            size="small"
                            aria-hidden="true"
                          />
                        </IonButton>
                      </Input>
                    </Form>
                  )}
                </Formik>

                <IonText color="tertiary">
                  <h2>Letzte Fragen</h2>
                </IonText>

                {/* <MessageList messages={(danger?.messages ?? []).filter((m) => m.referencedMessageId === null)} /> */}

                <IonGrid className="backgroundCard">
                  {messages.map((message, index) => (
                    <IonItem
                      key={message.id}
                      style={{ flexDirection: "column" }}
                      lines={index + 1 === messages.length ? "none" : "inset"}
                    >
                      <Formik
                        initialValues={{
                          answer: "",
                        }}
                        enableReinitialize={true}
                        // validateOnChange={true}
                        validateOnBlur={true}
                        onSubmit={async ({ answer }, { resetForm }) => {
                          if (!answer) {
                            return
                          }

                          console.log("submit answer", answer, message.id)

                          try {
                            const response = await messageService.messagePOST(
                              dangerId,
                              {
                                message: answer,
                                referencedMessageId: message.id,
                              },
                              currentUserToken || ""
                            )

                            console.log(response)

                            resetForm()

                            // Reload messages
                            await fetchDanger()
                          } catch (error) {
                            console.error("Failed to post answer", error)
                          }
                        }}
                      >
                        {({ values, errors }) => (
                          <Form style={{ width: "100%" }} id={`form-${message.id}`}>
                            <Comment
                              key={message.id}
                              username={message.user?.username ?? "User"}
                              date={message.createdAt}
                              avatar={message.userId ?? ""}
                              answers={message.answers}
                              messageId={message.id ?? ""}
                            >
                              {message.message}
                            </Comment>
                          </Form>
                        )}
                      </Formik>
                    </IonItem>
                  ))}
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      )}

      {notFound && (
        <IonContent>
          <IonCard style={{ marginTop: "" }} color="light">
            <IonText color="tertiary">
              <h2 style={{ marginLeft: "1rem" }}>404 Not Found</h2>
            </IonText>
          </IonCard>
        </IonContent>
      )}
    </IonPage>
  )
}

export default DangerZones
