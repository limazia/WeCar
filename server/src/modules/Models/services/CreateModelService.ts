import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { generateUUID } from '@shared/helpers/generateUUID'
import { connection } from '@shared/knex'

interface IRequest {
  model_name: string;
  model_slug: string;
  id_brand: string;
}

class CreateModelService {
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

export { CreateModelService }
