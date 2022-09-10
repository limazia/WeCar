import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Compose } from "./components/Core/Compose";
import { AuthProvider } from "./contexts";

import App from "./App";

const WrappedApp = Compose(AuthProvider)(App);

const root = createRoot(document.getElementById("app"));
root.render(
  <Router>
    <WrappedApp>
      <App />
    </WrappedApp>
  </Router>
);
