import { Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CustomRoutes } from "./components/Core/CustomRoutes";
import { Authenticated } from "./components/Core/Authenticated";

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
              <Authenticated roles={["admin", "login_admin"]}>
                <Dashboard />
              </Authenticated>
            }
          />
          <Route
            path="settings"
            element={
              <Authenticated roles={["admin", "login_admin"]}>
                <Settings />
              </Authenticated>
            }
          />
          <Route
            path="brands"
            element={
              <Authenticated roles={["admin", "brands"]}>
                <Brands />
              </Authenticated>
            }
          />
          <Route
            path="brand/:id"
            element={
              <Authenticated roles={["admin", "view_brand"]}>
                <BrandView />
              </Authenticated>
            }
          />
          <Route
            path="brand/create"
            element={
              <Authenticated roles={["admin", "create_brand"]}>
                <BrandCreate />
              </Authenticated>
            }
          />
          <Route
            path="models"
            element={
              <Authenticated roles={["admin", "models"]}>
                <Models />
              </Authenticated>
            }
          />
          <Route
            path="model/:id"
            element={
              <Authenticated roles={["admin", "view_model"]}>
                <ModelView />
              </Authenticated>
            }
          />
          <Route
            path="model/create"
            element={
              <Authenticated roles={["admin", "create_model"]}>
                <ModelCreate />
              </Authenticated>
            }
          />
          <Route
            path="cars"
            element={
              <Authenticated roles={["admin", "cars"]}>
                <Cars />
              </Authenticated>
            }
          />
          <Route
            path="car/:id"
            element={
              <Authenticated roles={["admin", "view_car"]}>
                <CarView />
              </Authenticated>
            }
          />
          <Route
            path="car/create"
            element={
              <Authenticated roles={["admin", "create_car"]}>
                <CarCreate />
              </Authenticated>
            }
          />
          <Route
            path="users"
            element={
              <Authenticated roles={["admin", "users"]}>
                <Users />
              </Authenticated>
            }
          />
          <Route
            path="user/:id"
            element={
              <Authenticated roles={["admin", "view_user"]}>
                <UserView />
              </Authenticated>
            }
          />
          <Route
            path="user/create"
            element={
              <Authenticated roles={["admin", "create_user"]}>
                <UserCreate />
              </Authenticated>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </CustomRoutes>
    </AnimatePresence>
  );
}

export default Router;