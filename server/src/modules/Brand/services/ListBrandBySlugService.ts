import { connection } from '@shared/knex'

import { Brand } from '../interfaces/Brand'
import { Car } from '@modules/Cars/interfaces/Car'
import { Model } from '@modules/Models/interfaces/Model'

interface IRequest {
  brand_slug: string;
}

interface IResponse extends Brand, Car, Model { }

class ListBrandBySlugService {
  public async execute({ brand_slug }: IRequest): Promise<IResponse[]> {
    const brands = await connection('brands')
      .select([
        'cars.*',
        'brands.brand_name as brand_name',
        'brands.brand_slug as brand_slug',
        'models.model_name as model_name',
        'models.model_slug as model_slug',
      ])
      .innerJoin('models', 'brands.brand_id', '=', 'models.id_brand')
      .innerJoin('cars', 'models.model_id', '=', 'cars.id_model')
      .where('brands.brand_slug', brand_slug)
      .orderBy('cars.created_at', 'desc')

    return brands || []
  }
}

export { ListBrandBySlugService }
