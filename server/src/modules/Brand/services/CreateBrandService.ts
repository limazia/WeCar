import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'
import { generateUUID } from '@shared/helpers/generateUUID'
import { connection } from '@shared/knex'

interface IRequest {
  brand_name: string;
  brand_slug: string;
}

class CreateBrandService {
  public async execute({ brand_name, brand_slug }: IRequest): Promise<void> {
    if (!brand_name) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (!brand_slug) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    const nameQuery = await connection('brands').where({ brand_name }).first()
    const slugQuery = await connection('brands').where({ brand_slug }).first()

    if (nameQuery) {
      throw new AppError(messages.error.form.VALUE_ALREADY_REGISTERED)
    }

    if (slugQuery) {
      throw new AppError(messages.error.form.VALUE_ALREADY_REGISTERED)
    }

    const brand_id = generateUUID()

    await connection('brands').insert({
      brand_id,
      brand_name,
      brand_slug,
    })
  }
}

export { CreateBrandService }
