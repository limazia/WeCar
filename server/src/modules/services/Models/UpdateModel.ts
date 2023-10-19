import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IRequest {
  model_id: string;
  model_name: string;
  model_slug: string;
  id_brand: string;
}

class UpdateModel {
  public async execute({
    model_id,
    model_name,
    model_slug,
    id_brand
  }: IRequest): Promise<void> {
    const model = await connection('models').where({ model_id }).first()

    if (!model) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    model.model_id = model_id
    model.model_name = model_name
    model.model_slug = model_slug
    model.id_brand = id_brand

    await connection('models').update(model).where({ model_id })
  }
}

export { UpdateModel }
