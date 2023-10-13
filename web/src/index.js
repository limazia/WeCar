import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Compose } from "./components/Core/Compose";
import { AuthProvider } from "./utils/context";

import App from "./App";

const WrappedApp = Compose(AuthProvider)(App);

if (process.env.REACT_APP_ENV === "production" || process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const root = createRoot(document.getElementById("app"));
root.render(
  <Router>
    <WrappedApp>
      <App />
    </WrappedApp>
  </Router>
);
