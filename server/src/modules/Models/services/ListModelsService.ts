import { connection } from '@shared/knex'

import { Model } from '../interfaces/Model'

class ListModelsService {
  public async execute(): Promise<Model[]> {
    const models = await connection('models')
      .select([
        'models.*',
        'brands.brand_name as brand_name',
        'brands.brand_slug as brand_slug',
      ])
      .leftJoin('brands', 'models.id_brand', '=', 'brands.brand_id')
      .orderBy('models.created_at', 'desc')

    return models || []
  }
}

export { ListModelsService }
