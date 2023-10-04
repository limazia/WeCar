import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'
import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'

import { Brand } from '../interfaces/Brand'

interface IRequest {
  brand_id: string;
}

class FindBrandByIdService {
  brandResponse(brand): Brand {
    const {
      brand_id,
      brand_name,
      brand_slug,
      updated_at,
      created_at,
    } = brand

    return {
      brand_id,
      brand_name,
      brand_slug,
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }
  }

  public async execute({ brand_id }: IRequest): Promise<Brand[]> {
    const brand = await connection('brands')
      .where({ brand_id })
      .orderBy('created_at', 'desc')
      .first()

    if (!brand) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const formattedBrand = this.brandResponse(brand)
    return [formattedBrand]
  }
}

export { FindBrandByIdService }
