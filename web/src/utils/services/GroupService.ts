import { api } from "@utils/axios/apiClient";

interface GroupProps {
  group_id?: string;
  group_name?: string;
  group_permissions?: string | string[];
}

export const GroupService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/groups");

      return data;
    } catch (ex) {
      console.error("[GET /groups] > it was not possible to make the request");
    }
  },

  create: async function ({ group_name, group_permissions }: GroupProps) {
    try {
      const { data } = await api.post("/api/groups", {
        group_name,
        group_permissions,
      });

      return data;
    } catch (ex) {
      console.error("[POST /groups] > it was not possible to make the request");
    }
  },

  findById: async function ({ group_id }: GroupProps) {
    try {
      const { data } = await api.get(`/api/groups/${group_id}`);

      return data;
    } catch (ex) {
      console.error("[GET /groups/:group_id] > it was not possible to make the request");
    }
  },

  update: async function ({ group_id, group_name, group_permissions }: GroupProps) {
    try {
      const { data } = await api.put(`/api/groups/${group_id}`, {
        group_name,
        group_permissions,
      });

      return data;
    } catch (ex) {
      console.error("[PUT /groups/:group_id] > it was not possible to make the request");
    }
  },


  delete: async function ({ group_id }: GroupProps) {
    try {
      const { data } = await api.delete(`/api/groups/${group_id}`);

      return data;
    } catch (ex) {
      console.error("[DELETE /groups/:group_id] > it was not possible to make the request");
    }
  },
};

