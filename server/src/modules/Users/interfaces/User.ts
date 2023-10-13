export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  is_deleteable: boolean;
  id_group?: string;
  group?: {
    id?: string;
    name: string;
    permissions: string[];
  };
  updated_at?: string;
  created_at: string;
}
