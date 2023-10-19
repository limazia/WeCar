import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'
import { moment } from '@helpers/moment'

import { Brand } from '@modules/models/Brand'

interface IRequest {
  brand_id: string;
}

class FindBrandById {
  public async execute({ brand_id }: IRequest): Promise<Brand> {
    const brand = await connection('brands')
      .where({ brand_id })
      .orderBy('created_at', 'desc')
      .first()

    if (!brand) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const {
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
}

export { FindBrandById }
