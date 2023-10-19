import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { generateUUID } from '@helpers/generateUUID'

interface IRequest {
  car_km: string;
  car_price: string;
  car_image: string;
  car_fuel: string;
  car_exchange: string;
  car_year: string;
  car_observation: string;
  id_model: string;
}

class CreateCar {
  public async execute({
    car_km,
    car_price,
    car_image,
    car_fuel,
    car_exchange,
    car_year,
    car_observation,
    id_model
  }: IRequest): Promise<void> {
    if (!car_km || !car_price || !car_fuel || !car_exchange || !car_year || !id_model) {
      throw new AppError('Missing data')
    }

    const car_id = generateUUID()

    await connection('cars').insert({
      car_id,
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      id_model
    })
  }
}

export { CreateCar }
