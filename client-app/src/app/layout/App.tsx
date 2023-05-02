import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activity/dashboard/ActivityDashboard";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
  const { activityStore } = useStore();
  const { loadingInitial } = activityStore;
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  
  if (loadingInitial) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
