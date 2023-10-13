export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  permissions: string[] | string;
  updated_at?: string;
  created_at: string;
}
