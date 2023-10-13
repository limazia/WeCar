import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { connection } from '@shared/knex'

interface IRequest {
  car_id: string;
  car_km: string;
  car_price: string;
  car_image: string;
  car_fuel: string;
  car_exchange: string;
  car_year: string;
  car_observation: string;
  id_model: string;
}

class UpdateCarService {
  public async execute({
    car_id,
    car_km,
    car_price,
    car_image,
    car_fuel,
    car_exchange,
    car_year,
    car_observation,
    id_model
  }: IRequest): Promise<void> {
    const car = await connection('cars').where({ car_id }).first()

    if(!car) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    car.car_id = car_id
    car.car_km = car_km
    car.car_price = car_price
    car.car_image = car_image
    car.car_fuel = car_fuel
    car.car_exchange = car_exchange
    car.car_year = car_year
    car.car_observation = car_observation
    car.id_model = id_model

    await connection('cars').update(car).where({ car_id })
  }
}

export { UpdateCarService }
