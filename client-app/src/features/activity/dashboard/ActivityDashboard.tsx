import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  formOpen: (id: string) => void;
  formClose: () => void;
  editMode: boolean;
  createOrUpdateActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectActivity,
  editMode,
  formOpen,
  formClose,
  createOrUpdateActivity,
  removeActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
            removeActivity={removeActivity}
          />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            formOpen={formOpen}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            formClose={formClose}
            createOrUpdateActivity={createOrUpdateActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
