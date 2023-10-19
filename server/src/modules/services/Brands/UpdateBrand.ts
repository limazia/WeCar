import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IRequest {
  brand_id: string;
  brand_name: string;
  brand_slug: string;
}

class UpdateBrand {
  public async execute({
    brand_id,
    brand_name,
    brand_slug
  }: IRequest): Promise<void> {
    const brand = await connection('brands').where({ brand_id }).first()

    if (!brand) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    brand.brand_id = brand_id
    brand.brand_name = brand_name
    brand.brand_slug = brand_slug

    await connection('brands').update(brand).where({ brand_id })
  }
}

export { UpdateBrand }
