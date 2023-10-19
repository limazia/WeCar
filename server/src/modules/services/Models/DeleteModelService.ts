import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IResult {
  model_id: string;
}

class DeleteModel {
  public async execute({ model_id }: IResult): Promise<void> {
    const model = await connection('models').where({ model_id }).first()

    if (!model) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('models').delete().where({ model_id })
  }
}

export { DeleteModel }
