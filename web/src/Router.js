import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";

import { Landing } from "./components/Pages/Landing";
import { Company } from "./components/Pages/Company";

//import { Login } from "./components/Pages/Admin/Login";
//import { Dashboard } from "./components/Pages/Admin/Dashboard";

import { NotFound } from "./components/Pages/NotFound";

function Router() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Landing />} />
          <Route path="company" element={<Company />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route exact path="" element={<h1>Dashboard</h1>} />
          <Route exact path="login" element={<h1>Login</h1>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Router;

//<Route path="*" element={<Navigate to="/" replace />} />