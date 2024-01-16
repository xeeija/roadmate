import { IonCard } from "@ionic/react"
import { FC } from "react"

import "./SavedRoute.css"
import placeholder from "../resources/images/placeholder.png"

const PlaceholderCard: FC = () => {
  return (
    <IonCard className="" color="light">
      <div className="map-container">
        <img src={placeholder} alt="Placeholder" />
      </div>
    </IonCard>
  )
}

export default PlaceholderCard
