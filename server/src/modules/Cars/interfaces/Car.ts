export interface Car {
  car_id: string;
  car_km: string | number;
  car_price: string | number;
  car_image: string[] | string;
  car_fuel: string;
  car_exchange: string;
  car_year: string;
  car_observation: string;
  updated_at?: string;
  created_at: string;
}
