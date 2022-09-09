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

import { Login } from "./components/Pages/Admin/Login";
import { Dashboard } from "./components/Pages/Admin/Dashboard";
import { Settings } from "./components/Pages/Admin/Settings";
import {
  Brands,
  BrandCreate,
  BrandView,
} from "./components/Pages/Admin/Brands";

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
        <Route path="/admin" element={<Admin />}>
          <Route exact path="login" element={<Login />} />
          <Route exact path="" element={<Private unique><Dashboard /></Private>}
          />
          <Route
            path="settings"
            element={
              <Private unique>
                <Settings />
              </Private>
            }
          />
          <Route
            path="brands"
            element={
              <Private roles={["admin", "brands"]}>
                <Brands />
              </Private>
            }
          />
          <Route
            path="brand/:id"
            element={
              <Private roles={["admin", "view_brand"]}>
                <BrandView />
              </Private>
            }
          />
          <Route
            path="brand/create"
            element={
              <Private roles={["admin", "create_brand"]}>
                <BrandCreate />
              </Private>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </CustomRoutes>
    </AnimatePresence>
  );
}

export default Router;
