import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'

import { Car } from '../interfaces/Car'

interface IResponse {
  results: Car[];
}

class ListCarsService {
  public async execute(): Promise<IResponse> {
    const cars = await connection('cars')
      .select(
        'cars.*',
        'brands.brand_name as brand_name',
        'brands.brand_slug as brand_slug',
        'models.model_name as model_name',
        'models.model_slug as model_slug'
      )
      .leftJoin('models', 'cars.id_model', '=', 'models.model_id')
      .leftJoin('brands', 'models.id_brand', '=', 'brands.brand_id')
      .orderBy('cars.created_at', 'desc')

    const serializedItems = cars.map(({
      car_image,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      car_image: car_image ? (car_image as string).split(',').map(image => image.trim()) : [],
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }))

    return {
      results: serializedItems,
    }
  }
}

export { ListCarsService }
