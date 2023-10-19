export interface Car {
  car_id: string;
  car_fuel: string;
  car_exchange: string;
  car_year: string;
  car_observation: string;
  car_km: number;
  car_price: number;
  car_image: string[] | string;
  id_model: string;
  brand_name: string;
  brand_slug: string;
  model_name: string;
  model_slug: string;
  updated_at?: string;
  created_at?: string;
}
