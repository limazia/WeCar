import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { connection } from '@shared/knex'

interface IResult {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IResult): Promise<void> {
    const user = await connection('users').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('users').delete().where({ id })
  }
}

export { DeleteUserService }
