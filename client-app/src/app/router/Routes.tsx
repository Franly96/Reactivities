import { RouteObject, createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activity/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activity/details/ActivityDetails";
import ActivityForm from "../../features/activity/form/ActivityForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "activities/create", element: <ActivityForm key="create" /> },
      { path: "activities/edit/:id", element: <ActivityForm key="edit" /> },
    ],
  },
];
export const router = createBrowserRouter(routes);
