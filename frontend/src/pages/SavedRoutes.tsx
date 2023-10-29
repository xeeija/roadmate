import { IonAlert, IonButton, IonContent, IonPage } from "@ionic/react";

import ToolBar from "../components/navigation/ToolBar";
import SavedRoute from "../components/SavedRoute";

const SavedRoutes: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="toolbar-container">
          <ToolBar title="Routen" backButton={true} />
        </div>

        <div className="saved-routes-list">
          <SavedRoute name="Route 1" id={1} />
          <SavedRoute name="Route zum Helmi" id={2} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SavedRoutes;