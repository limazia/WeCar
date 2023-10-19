import { connection } from '@knex/index'

import { Car } from '@modules/models/Car'
import { Model } from '@modules/models/Model'
import { Brand } from '@modules/models/Brand'

interface IRequest {
  brand_slug: string;
}

interface IResponse extends Brand, Car, Model { }

class ListBrandBySlug {
  public async execute({ brand_slug }: IRequest): Promise<IResponse[]> {
    const brands = await connection('brands')
      .select([
        'models.model_name as model_name',
        'models.model_slug as model_slug',
      ])
      .innerJoin('models', 'brands.brand_id', '=', 'models.id_brand')
      .where('brands.brand_slug', brand_slug)
      .orderBy('models.created_at', 'desc')

    return brands || []
  }
}

export { ListBrandBySlug }
