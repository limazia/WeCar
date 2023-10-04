import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { connection } from '@shared/knex'

interface IResult {
  model_id: string;
}

class DeleteModelService {
  public async execute({ model_id }: IResult): Promise<void> {
    const model = await connection('models').where({ model_id }).first()

    if (!model) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('models').delete().where({ model_id })
  }
}

export { DeleteModelService }
