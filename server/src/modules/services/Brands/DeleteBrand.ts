import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IResult {
  brand_id: string;
}

class DeleteBrand {
  public async execute({ brand_id }: IResult): Promise<void> {
    const brand = await connection('brands').where({ brand_id }).first()

    if (!brand) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('brands').delete().where({ brand_id })
  }
}

export { DeleteBrand }
