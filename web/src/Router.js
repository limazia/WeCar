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
import {
  Models,
  ModelCreate,
  ModelView,
} from "./components/Pages/Admin/Models";
import { Cars, CarCreate, CarView } from "./components/Pages/Admin/Cars";
import { Users, UserCreate, UserView } from "./components/Pages/Admin/Users";

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
        <Route exact path="admin/login" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route
            exact
            path=""
            element={
              <Private roles={["admin", "login_admin"]}>
                <Dashboard />
              </Private>
            }
          />
          <Route
            path="settings"
            element={
              <Private roles={["admin", "login_admin"]}>
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
          <Route
            path="models"
            element={
              <Private roles={["admin", "models"]}>
                <Models />
              </Private>
            }
          />
          <Route
            path="model/:id"
            element={
              <Private roles={["admin", "view_model"]}>
                <ModelView />
              </Private>
            }
          />
          <Route
            path="model/create"
            element={
              <Private roles={["admin", "create_model"]}>
                <ModelCreate />
              </Private>
            }
          />
          <Route
            path="cars"
            element={
              <Private roles={["admin", "cars"]}>
                <Cars />
              </Private>
            }
          />
          <Route
            path="car/:id"
            element={
              <Private roles={["admin", "view_car"]}>
                <CarView />
              </Private>
            }
          />
          <Route
            path="car/create"
            element={
              <Private roles={["admin", "create_car"]}>
                <CarCreate />
              </Private>
            }
          />
          <Route
            path="users"
            element={
              <Private roles={["admin", "users"]}>
                <Users />
              </Private>
            }
          />
          <Route
            path="user/:id"
            element={
              <Private roles={["admin", "view_user"]}>
                <UserView />
              </Private>
            }
          />
          <Route
            path="user/create"
            element={
              <Private roles={["admin", "create_user"]}>
                <UserCreate />
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