import { BrowserRouter } from "react-router-dom";
import { Toastify } from "./components/Toastify";
import Router from "./Router";

import "./styles/styles.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toastify autoClose={5000} />
    </BrowserRouter>
  );
}

export default App;