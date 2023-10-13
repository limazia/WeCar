import { Navigate, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CustomRoutes } from "./components/CustomRoutes";
import { Authenticated } from "@components/Authenticated";
import { Layout, AdminLayout } from "@components/Layout";

import { Home } from "@pages/Home";
import { Store } from "@pages/Store";
import { Buy } from "@pages/Buy";
import { Sell } from "@pages/Sell";
import { Company } from "@pages/Company";
import { Contact } from "@pages/Contact";

import { Login } from "@pages/Admin/Login";
import { Dashboard } from "@pages/Admin/Dashboard";
import { Settings } from "@pages/Admin/Settings";
import { Account, Name, Email, Password } from "@components/Cards/Settings";
import { Brands, CreateBrand, UpdateBrand } from "@pages/Admin/Brands";
import { Models, CreateModel, UpdateModel } from "@pages/Admin/Models";
import { Cars, CreateCar, UpdateCar } from "@pages/Admin/Cars";
import { Groups, CreateGroup, UpdateGroup } from "@pages/Admin/Groups";
import { Users, CreateUser, UpdateUser } from "@pages/Admin/Users";

import { NotFound } from "@pages/NotFound";

export function Routes() {
  return (
    <AnimatePresence mode="wait">
      <CustomRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sell" element={<Sell />} />
          <Route path="company" element={<Company />} />
          <Route path="contact" element={<Contact />} />
          <Route path="store" element={<Store />}>
            <Route index element={<Store />} />
            <Route path=":brand_slug" element={<Store />} />
            <Route path=":brand_slug/:model_slug" element={<Store />} />
          </Route>
        </Route>

        <Route path="/car/:car_id" element={<Buy />} />
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <Authenticated>
              <AdminLayout />
            </Authenticated>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="settings" element={<Settings />}>
            <Route
              index
              element={<Navigate to="/admin/settings/info" replace />}
            />
            <Route path="info" element={<Account />} />
            <Route path="name" element={<Name />} />
            <Route path="email" element={<Email />} />
            <Route path="password" element={<Password />} />
          </Route>

          <Route path="brands">
            <Route index element={<Brands />} />
            <Route path="create" element={<CreateBrand />} />
            <Route path="edit/:brand_id" element={<UpdateBrand />} />
          </Route>

          <Route path="models">
            <Route index element={<Models />} />
            <Route path="create" element={<CreateModel />} />
            <Route path="edit/:model_id" element={<UpdateModel />} />
          </Route>

          <Route path="cars">
            <Route index element={<Cars />} />
            <Route path="create" element={<CreateCar />} />
            <Route path="edit/:car_id" element={<UpdateCar />} />
          </Route>

          <Route path="groups">
            <Route index element={<Groups />} />
            <Route path="create" element={<CreateGroup />} />
            <Route path="edit/:group_id" element={<UpdateGroup />} />
          </Route>

          <Route path="users">
            <Route index element={<Users />} />
            <Route path="create" element={<CreateUser />} />
            <Route path="edit/:id" element={<UpdateUser />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </CustomRoutes>
    </AnimatePresence>
  );
}
