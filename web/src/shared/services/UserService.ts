import { api } from "@shared/axios/apiClient";
import { handleRequestError } from "@shared/helpers/handleRequestError";
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
      handleRequestError("[GET /users");
    }
  },

  create: async function ({ payload }: UserProps) {
    try {
      const { data } = await api.post("/api/users", payload);

      return data;
    } catch (ex) {
      handleRequestError("[POST /users");
    }
  },

  account: async function () {
    try {
      const { data } = await api.get<Account>("/api/me/account");

      return data;
    } catch (ex) {
      handleRequestError("[GET /me/account");
    }
  },

  updateAccount: async function ({ scope, id, payload }: UserProps) {
    try {
      const { data } = await api.put(`/api/me/${scope}/${id}`, payload);

      return data;
    } catch (ex) {
      handleRequestError("[PUT /me/:scope/:id");
    }
  },

  findById: async function ({ id }: UserProps) {
    try {
      const { data } = await api.get(`/api/users/${id}`);

      return data;
    } catch (ex) {
      handleRequestError("[GET /users/:id");
    }
  },

  update: async function ({ id, payload }: UserProps) {
    try {
      const { data } = await api.put(`/api/users/${id}`, payload);

      return data;
    } catch (ex) {
      handleRequestError("[PUT /users/:id");
    }
  },

  delete: async function (id: string) {
    try {
      const { data } = await api.delete(`/api/users/${id}`);

      return data;
    } catch (ex) {
      handleRequestError("[DELETE /users/:id");
    }
  },
};

