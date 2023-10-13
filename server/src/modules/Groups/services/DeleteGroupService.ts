import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { connection } from '@shared/knex'

interface IResult {
  group_id: string;
}

class DeleteGroupService {
  public async execute({ group_id }: IResult): Promise<void> {
    const group = await connection('groups').where({ group_id }).first()

    if (!group) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('groups').delete().where({ group_id })
  }
}

export { DeleteGroupService }
