import { api } from "@shared/axios/apiClient";
import { handleRequestError } from "@shared/helpers/handleRequestError";

export const GroupService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/groups");

      return data;
    } catch (ex) {
      handleRequestError("GET /groups");
    }
  },

  create: async function (group_name: string, group_permissions: string | string[]) {
    try {
      const { data } = await api.post("/api/groups", {
        group_name,
        group_permissions,
      });

      return data;
    } catch (ex) {
      handleRequestError("POST /groups");
    }
  },

  findById: async function (group_id: string) {
    try {
      const { data } = await api.get(`/api/groups/${group_id}`);

      return data;
    } catch (ex) {
      handleRequestError("GET /groups/:group_id");
    }
  },

  update: async function (group_id: string, group_name: string, group_permissions: string | string[]) {
    try {
      const { data } = await api.put(`/api/groups/${group_id}`, {
        group_name,
        group_permissions,
      });

      return data;
    } catch (ex) {
      handleRequestError("PUT /groups/:group_id");
    }
  },


  delete: async function (group_id: string) {
    try {
      const { data } = await api.delete(`/api/groups/${group_id}`);

      return data;
    } catch (ex) {
      handleRequestError("DELETE /groups/:group_id");
    }
  },
};

