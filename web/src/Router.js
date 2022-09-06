import { Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CustomRoutes, Private } from "./utils/routes";

import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";

import { Buy } from "./components/Pages/Buy";
import { Company } from "./components/Pages/Company";
import { Sell } from "./components/Pages/Sell";
import { Contact } from "./components/Pages/Contact";

import { Car } from "./components/Pages/Car";
//import { Brand } from "./components/Pages/Brand";

import { Login } from "./components/Pages/Admin/Login";
import { Dashboard } from "./components/Pages/Admin/Dashboard";

import { NotFound } from "./components/Pages/NotFound";

function Router() {
  return (
    <AnimatePresence exitBeforeEnter>
      <CustomRoutes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Buy />} />
          <Route path="sell" element={<Sell />} />
          <Route path="company" element={<Company />} />
          <Route path="contact" element={<Contact />} />
          <Route exact path="buy/car" element={<Car />} />
          <Route exact path="buy/car/:brand" element={<Car />} />
          <Route exact path="buy/car/:brand/:model" element={<Car />} />
        </Route>
        <Route exact path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Private><Admin /></Private>}>
          <Route exact path="" element={<Dashboard />} />
          <Route path="cars" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </CustomRoutes>
    </AnimatePresence>
  );
}

export default Router;

//<Route path="*" element={<Navigate to="/" replace />} />
