import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IResult {
  group_id: string;
}

class DeleteGroup {
  public async execute({ group_id }: IResult): Promise<void> {
    const group = await connection('groups').where({ group_id }).first()

    if (!group) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('groups').delete().where({ group_id })
  }
}

export { DeleteGroup }
