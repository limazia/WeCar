export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role_id?: string;
  role: string;
  permissions: string[];
  is_deleteable: boolean;
  updated_at?: string;
  created_at?: string;
}
