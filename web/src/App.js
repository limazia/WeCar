import { Fragment } from "react";

import useAuth from "./utils/hooks/useAuth";

import Router from "./Router";
import { Toastify } from "./components/Partials/Toastify";

import "./styles/styles.css";

function App() {
  const { user } = useAuth();

  return (
    <Fragment>
      <Router permissions={user?.permissions} />
      <Toastify autoClose={5000} />
    </Fragment>
  );
}

export default App;
