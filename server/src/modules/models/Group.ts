export interface Group {
  group_id: string;
  group_name: string;
  group_permissions: string[];
  is_deleteable: boolean;
  updated_at?: string;
  created_at?: string;
}
