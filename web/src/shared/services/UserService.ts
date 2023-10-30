import { api } from "@shared/axios/apiClient";
import { Account } from "@shared/interfaces";

interface UserProps {
  scope?: string;
  id?: string;
  payload?: {
    name?: string;
    email?: string;
    password?: string;
    id_group?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
}

export const UserService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/users");

      return data;
    } catch (ex) {
      console.error("[GET /users] > it was not possible to make the request");
    }
  },

  create: async function ({ payload }: UserProps) {
    try {
      const { data } = await api.post("/api/users", payload);

      return data;
    } catch (ex) {
      console.error("[POST /users] > it was not possible to make the request");
    }
  },

  account: async function () {
    try {
      const { data } = await api.get<Account>("/api/me/account");

      return data;
    } catch (ex) {
      console.error("[GET /me/account] > it was not possible to make the request");
    }
  },

  updateAccount: async function ({ scope, id, payload }: UserProps) {
    try {
      const { data } = await api.put(`/api/me/${scope}/${id}`, payload);

      return data;
    } catch (ex) {
      console.error("[PUT /me/:scope/:id] > it was not possible to make the request");
    }
  },

  findById: async function ({ id }: UserProps) {
    try {
      const { data } = await api.get(`/api/users/${id}`);

      return data;
    } catch (ex) {
      console.error("[GET /users/:id] > it was not possible to make the request");
    }
  },

  update: async function ({ id, payload }: UserProps) {
    try {
      const { data } = await api.put(`/api/users/${id}`, payload);

      return data;
    } catch (ex) {
      console.error("[PUT /users/:id] > it was not possible to make the request");
    }
  },

  delete: async function (id: string) {
    try {
      const { data } = await api.delete(`/api/users/${id}`);

      return data;
    } catch (ex) {
      console.error("[DELETE /users/:id] > it was not possible to make the request");
    }
  },
};

