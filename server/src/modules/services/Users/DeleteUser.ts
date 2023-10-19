import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IResult {
  id: string;
}

class DeleteUser {
  public async execute({ id }: IResult): Promise<void> {
    const user = await connection('users').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('users').delete().where({ id })
  }
}

export { DeleteUser }
