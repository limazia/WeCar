import { connection } from '@knex/index'

import { moment } from '@helpers/moment'

import { Model } from '@modules/models/Model'

interface IResponse {
  results: Model[];
}

class ListModels {
  public async execute(): Promise<IResponse> {
    const models = await connection('models')
      .select([
        'models.*',
        'brands.brand_name as brand_name',
        'brands.brand_slug as brand_slug',
      ])
      .leftJoin('brands', 'models.id_brand', '=', 'brands.brand_id')
      .orderBy('models.created_at', 'desc')

    const serializedItems = models.map(({
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }))

    return {
      results: serializedItems,
    }
  }
}

export { ListModels }
