import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'
import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'

import { Car } from '../interfaces/Car'

interface IRequest {
  car_id: string;
}

class FindCarsByIdService {
  carResponse(car): Car {
    const {
      car_id,
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      brand_name,
      brand_slug,
      model_name,
      model_slug,
      updated_at,
      created_at,
    } = car

    return {
      car_id,
      car_km: Number(car_km),
      car_price: Number(car_price),
      car_image: car_image ? (car_image as string).split(',').map(image => image.trim()) : [],
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      brand_name,
      brand_slug,
      model_name,
      model_slug,
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }
  }

  public async execute({ car_id }: IRequest): Promise<Car[]> {
    const car = await connection('cars')
      .select([
        'cars.*',
        'brands.brand_name as brand_name',
        'brands.brand_slug as brand_slug',
        'models.model_name as model_name',
        'models.model_slug as model_slug',
      ])
      .leftJoin('models', 'cars.id_model', '=', 'models.model_id')
      .leftJoin('brands', 'models.id_brand', '=', 'brands.brand_id')
      .where('cars.car_id', car_id)
      .orderBy('cars.created_at', 'desc')
      .first()

    if (!car) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const formattedCar = this.carResponse(car)
    return [formattedCar]
  }
}

export { FindCarsByIdService }
