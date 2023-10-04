import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'
import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'

import { Model } from '../interfaces/Model'

interface IRequest {
  model_id: string;
}

class FindModelByIdService {
  modelResponse(model): Model {
    const {
      model_id,
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

  public async execute({ model_id }: IRequest): Promise<Model[]> {
    const model = await connection('models')
      .where({ model_id })
      .orderBy('created_at', 'desc')
      .first()

    if (!model) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const formattedModel = this.modelResponse(model)
    return [formattedModel]
  }
}

export { FindModelByIdService }
