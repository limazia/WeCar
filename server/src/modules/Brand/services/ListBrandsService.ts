import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'

import { Brand } from '../interfaces/Brand'

interface IResponse {
  results: Brand[];
}

class ListBrandsService {
  public async execute(): Promise<IResponse> {
    const brands = await connection('brands').orderBy('created_at', 'desc')

    const serializedItems = brands.map(({
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

export { ListBrandsService }
