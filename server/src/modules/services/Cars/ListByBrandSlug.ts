import { connection } from '@knex/index'

import { Car } from '@modules/models/Car'

interface IRequest {
  brand_slug: string;
}

class ListByBrandSlug {
  public async execute({ brand_slug }: IRequest): Promise<Car[]> {
    const cars = await connection('cars')
      .select([
        'cars.*',
        'brands.brand_name as brand_name',
        'brands.brand_slug as brand_slug',
        'models.model_name as model_name',
        'models.model_slug as model_slug',
      ])
      .leftJoin('models', 'cars.id_model', '=', 'models.model_id')
      .leftJoin('brands', 'models.id_brand', '=', 'brands.brand_id')
      .where('brands.brand_slug', brand_slug)
      .orderBy('cars.created_at', 'desc')

    return cars || []
  }
}

export { ListByBrandSlug }
