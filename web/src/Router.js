import { Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CustomRoutes } from "./components/Core/CustomRoutes";
import { Authenticated, Private } from "./components/Core/Authenticated";

import Home from "./pages/Home";
import Admin from "./pages/Admin";

import { Landing } from "./components/Pages/Landing";
import { Company } from "./components/Pages/Company";
import { Sell } from "./components/Pages/Sell";
import { Contact } from "./components/Pages/Contact";
import { Buy } from "./components/Pages/Buy";
import { Car } from "./components/Pages/Car";

import { Login } from "./components/Pages/Admin/Login";
import { Dashboard } from "./components/Pages/Admin/Dashboard";
import { Settings } from "./components/Pages/Admin/Settings";

import { BrandsList } from "./components/Pages/Admin/Brands/BrandsList";
import { BrandCreate } from "./components/Pages/Admin/Brands/BrandCreate";
import { BrandUpdate } from "./components/Pages/Admin/Brands/BrandUpdate";

import { ModelsList } from "./components/Pages/Admin/Models/ModelsList";
import { ModelCreate } from "./components/Pages/Admin/Models/ModelCreate";
import { ModelUpdate } from "./components/Pages/Admin/Models/ModelUpdate";

import { CarsList } from "./components/Pages/Admin/Cars/CarsList";
import { CarCreate } from "./components/Pages/Admin/Cars/CarCreate";
import { CarUpdate } from "./components/Pages/Admin/Cars/CarUpdate";

import { UsersList } from "./components/Pages/Admin/Users/UsersList";
import { UserCreate } from "./components/Pages/Admin/Users/UserCreate";
import { UserUpdate } from "./components/Pages/Admin/Users/UserUpdate";
 
import { NotFound } from "./components/Pages/NotFound";

function Router() {
  return (
    <AnimatePresence exitBeforeEnter>
      <CustomRoutes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Landing />} />
          <Route path="sell" element={<Sell />} />
          <Route path="company" element={<Company />} />
          <Route path="contact" element={<Contact />} />
          <Route exact path="buy" element={<Buy />} />
          <Route exact path="buy/:brand" element={<Buy />} />
          <Route exact path="buy/:brand/:model" element={<Buy />} />
        </Route>
        <Route exact path="/car/:car_id" element={<Car />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Authenticated children={<Admin />} />}>
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
                <BrandsList />
              </Private>
            }
          />
          <Route
            path="brand/edit/:brand_id"
            element={
              <Private roles={["admin", "edit_brand"]}>
                <BrandUpdate />
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
                <ModelsList />
              </Private>
            }
          />
          <Route
            path="model/edit/:model_id"
            element={
              <Private roles={["admin", "edit_model"]}>
                <ModelUpdate />
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
                <CarsList />
              </Private>
            }
          />
          <Route
            path="car/edit/:car_id"
            element={
              <Private roles={["admin", "update_car"]}>
                <CarUpdate />
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
                <UsersList />
              </Private>
            }
          />
          <Route
            path="user/edit/:id"
            element={
              <Private roles={["admin", "user_update"]}>
                <UserUpdate />
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
