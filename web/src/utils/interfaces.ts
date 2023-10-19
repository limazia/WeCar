export interface Car {
  car_id?: string;
  car_fuel: string;
  car_exchange: string;
  car_year: string;
  car_observation?: string;
  car_km: number;
  car_price: number;
  car_image: string[] | string;
  id_model?: string;
  brand_name?: string;
  brand_slug?: string;
  model_name?: string;
  model_slug?: string;
  updated_at?: string;
  created_at?: string;
}

export interface Brand {
  brand_id: string;
  brand_name: string;
  brand_slug: string;
  updated_at: string;
  created_at: string;
}

export interface Model {
  model_id: string;
  model_name: string;
  model_slug: string;
  id_brand: string;
  brand_name: string;
  brand_slug: string;
  updated_at: string;
  created_at: string;
}

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

export interface Group {
  group_id: string;
  group_name: string;
  group_permissions: string[];
  is_deleteable: boolean;
}

export interface Account {
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

export interface Contact {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface CarLogo {
  name: string;
  slug: string;
  image: {
    thumb: string;
    optimized: string;
    original: string;
  }
}

export interface Send {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ExchangeOptions {
  automatic: string;
  manual: string;
}

export interface FuelOptions {
  gasoline: string;
  flex: string;
  diesel: string;
  hybrid: string;
  electric: string;
}

export interface Permission {
  name: string;
  permissions: {
    label: string;
    description: string;
  }[];
}
