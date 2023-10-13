import { connection } from '@shared/knex'

import { Brand } from '../interfaces/Brand'

class ListBrandsService {
  public async execute(): Promise<Brand[]> {
    const brands = await connection('brands').orderBy('created_at', 'desc')

    return brands || []
  }
}

export { ListBrandsService }
