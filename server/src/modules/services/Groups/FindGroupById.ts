import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'
import { moment } from '@helpers/moment'

import { Group } from '@modules/models/Group'

interface IRequest {
  group_id: string;
}

class FindGroupById {
  public async execute({ group_id }: IRequest): Promise<Group> {
    const group = await connection('groups').where({ group_id }).first()

    if (!group) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const {
      group_name,
      group_permissions,
      is_deleteable,
      updated_at,
      created_at
    } = group

    return {
      group_id,
      group_name,
      group_permissions,
      is_deleteable: Boolean(is_deleteable),
      updated_at: moment(updated_at).format('LL'),
      created_at: moment(created_at).format('LL'),
    }
  }
}

export { FindGroupById }
