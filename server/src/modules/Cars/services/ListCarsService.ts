import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'

import { Car } from '../interfaces/Car'

interface IRequest {
  page: number;
  limit: number;
}

interface IResponse {
  total: number;
  limit: number;
  page: number;
  pages: number;
  results: Car[];
}

class ListCarsService {
  public async execute({ page, limit }: IRequest): Promise<IResponse> {
    const offset = limit * page - limit

    const cars: Car[] = await connection('cars')
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
      .limit(limit)
      .offset(offset)
    const totalCount = await connection('cars').count()

    const serializedItems = cars.map(({
      car_km,
      car_price,
      car_image,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      car_km: Number(car_km),
      car_price: Number(car_price),
      car_image: car_image ? (car_image as string).split(',').map(image => image.trim()) : [],
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }))

    return {
      total: Number(totalCount.length),
      limit: Number(limit),
      page: Number(page),
      pages: Math.ceil(Number(totalCount.length) / limit),
      results: serializedItems,
    }
  }
}

export { ListCarsService }
