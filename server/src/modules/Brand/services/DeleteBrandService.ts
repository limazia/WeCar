import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { connection } from '@shared/knex'

interface IResult {
  brand_id: string;
}

class DeleteBrandService {
  public async execute({ brand_id }: IResult): Promise<void> {
    const brand = await connection('brands').where({ brand_id }).first()

    if (!brand) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('brands').delete().where({ brand_id })
  }
}

export { DeleteBrandService }
