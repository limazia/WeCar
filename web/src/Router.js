import { Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CustomRoutes } from "./utils/routes";

import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";

import { Landing } from "./components/Pages/Landing";
import { Company } from "./components/Pages/Company";
//import { Stock } from "./components/Pages/Stock";
import { Sell } from "./components/Pages/Sell";
//import { Contact } from "./components/Pages/Contact";

import { Car } from "./components/Pages/Car";
//import { Brand } from "./components/Pages/Brand";

import { Login } from "./components/Pages/Admin/Login";
//import { Dashboard } from "./components/Pages/Admin/Dashboard";

import { NotFound } from "./components/Pages/NotFound";

function Router() {
  return (
    <AnimatePresence exitBeforeEnter>
      <CustomRoutes>
        <Route path="/" element={<Home />} loading>
          <Route path="" element={<Landing />} />
          <Route path="stock" element={<Company />} />
          <Route path="sell" element={<Sell />} />
          <Route path="company" element={<Company />} />
          <Route path="contact" element={<Company />} />
          <Route exact path="buy/car/:brand" element={<Car />} />
          <Route exact path="buy/car/:brand/:model" element={<Car />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route
            exact
            path=""
            element={<Navigate to="/admin/login" replace />}
          />
          <Route exact path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </CustomRoutes>
    </AnimatePresence>
  );
}

export default Router;

//<Route path="*" element={<Navigate to="/" replace />} />
