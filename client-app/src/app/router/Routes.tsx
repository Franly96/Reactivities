import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activity/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activity/details/ActivityDetails";
import ActivityForm from "../../features/activity/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import LoginForm from "../../features/users/LoginForm";
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
      { path: "login", element: <LoginForm/> },
      { path: "errors", element: <TestErrors/> },
      { path: "not-found", element: <NotFound/> },
      { path: "server-error", element: <ServerError/> },
      { path: "*", element: <Navigate replace to='/not-found'/> },
    ],
  },
];
export const router = createBrowserRouter(routes);
