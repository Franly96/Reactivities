import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { ToastContainer } from "react-toastify";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";

function App() {
  const location = useLocation();
  if (location.pathname === "/") return <HomePage />;
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);
