import { connection } from '@shared/knex'

import { Car } from '@modules/Cars/interfaces/Car'
import { Model } from '@modules/Models/interfaces/Model'
import { Brand } from '@modules/Brand/interfaces/Brand'

interface IRequest {
  brand_slug: string;
}

interface IResponse extends Brand, Car, Model { }

class ListBrandBySlugService {
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

export { ListBrandBySlugService }
