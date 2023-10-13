import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'
import { connection } from '@shared/knex'
import { generateUUID } from '@shared/helpers/generateUUID'

interface IRequest {
  group_name: string;
  group_permissions: string[];
}

class CreateGroupService {
  public async execute({ group_name, group_permissions }: IRequest): Promise<void> {
    if (!group_name) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (!group_permissions) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    const nameQuery = await connection('groups').where({ group_name }).first()

    if (nameQuery) {
      throw new AppError(messages.error.form.VALUE_ALREADY_REGISTERED)
    }

    const group_id = generateUUID()

    await connection('groups').insert({
      group_id,
      group_name,
      group_permissions,
    })
  }
}

export { CreateGroupService }
