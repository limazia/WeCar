import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'
import { generateUUID } from '@helpers/generateUUID'

interface IRequest {
  model_name: string;
  model_slug: string;
  id_brand: string;
}

class CreateModel {
  public async execute({
    model_name,
    model_slug,
    id_brand
  }: IRequest): Promise<void> {
    if (!id_brand) {
      throw new AppError('Missing data')
    }

    if (!model_name) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (!model_slug) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    const nameQuery = await connection('models').where({ model_name }).first()
    const slugQuery = await connection('models').where({ model_slug }).first()

    if (nameQuery) {
      throw new AppError(messages.error.form.VALUE_ALREADY_REGISTERED)
    }

    if (slugQuery) {
      throw new AppError(messages.error.form.VALUE_ALREADY_REGISTERED)
    }

    const model_id = generateUUID()

    await connection('models').insert({
      model_id,
      model_name,
      model_slug,
      id_brand,
    })
  }
}

export { CreateModel }
