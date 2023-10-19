import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { generateUUID } from '@helpers/generateUUID'
import { messages } from '@helpers/constants/messages'

interface IRequest {
  group_name: string;
  group_permissions: string[];
}

class CreateGroup {
  public async execute({ group_name, group_permissions }: IRequest): Promise<void> {
    if (!group_name || !group_permissions) {
      throw new AppError('Missing data')
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

export { CreateGroup }
