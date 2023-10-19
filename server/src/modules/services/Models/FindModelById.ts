import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'
import { moment } from '@helpers/moment'

import { Model } from '@modules/models/Model'

interface IRequest {
  model_id: string;
}

class FindModelById {
  public async execute({ model_id }: IRequest): Promise<Model> {
    const model = await connection('models')
      .where({ model_id })
      .orderBy('created_at', 'desc')
      .first()

    if (!model) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const {
      model_name,
      model_slug,
      id_brand,
      updated_at,
      created_at
    } = model

    return {
      model_id,
      model_name,
      model_slug,
      id_brand,
      updated_at: moment(updated_at).format('DD [de] MMMM, YYYY'),
      created_at: moment(created_at).format('DD [de] MMMM, YYYY'),
    }
  }
}

export { FindModelById }
