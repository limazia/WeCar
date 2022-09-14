import { Fragment } from "react";

import Router from "./Router";
import { Toastify } from "./components/Partials/Toastify";

import "./styles/styles.css";

function App() {
  return (
    <>
      <Router />
      <Toastify autoClose={5000} />
    </>
  );
}

export default App;
