import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { connection } from '@shared/knex'

interface IRequest {
  group_id: string;
  group_name: string;
  group_permissions: string[];
}

class UpdateGroupService {
  public async execute({
    group_id,
    group_name,
    group_permissions
  }: IRequest): Promise<void> {
    const group = await connection('groups').where({ group_id }).first()

    if (!group) {
      throw new AppError(messages.error.NO_USER_FOUND_WITH_THIS_ID)
    }

    group.group_id = group_id
    group.group_name = group_name
    group.group_permissions = group_permissions

    await connection('groups').update(group).where({ group_id })
  }
}

export { UpdateGroupService }
