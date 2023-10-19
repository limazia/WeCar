import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'
import { moment } from '@helpers/moment'

import { Car } from '@modules/models/Car'

interface IRequest {
  car_id: string;
}

class FindCarsById {
  public async execute({ car_id }: IRequest): Promise<Car> {
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

    const {
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      car_km,
      car_price,
      car_image,
      id_model,
      brand_name,
      brand_slug,
      model_name,
      model_slug,
      updated_at,
      created_at,
    } = car

    return {
      car_id,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      car_km,
      car_price,
      car_image: car_image ? (car_image as string).split(',').map(image => image.trim()) : [],
      id_model,
      brand_name,
      brand_slug,
      model_name,
      model_slug,
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }
  }
}

export { FindCarsById }
