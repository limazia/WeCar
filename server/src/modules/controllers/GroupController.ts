import { Request, Response } from 'express'

import { messages } from '@helpers/constants/messages'

import { ListGroups } from '@modules/services/Groups/ListGroups'
import { CreateGroup } from '@modules/services/Groups/CreateGroup'
import { FindGroupById } from '@modules/services/Groups/FindGroupById'
import { UpdateGroup } from '@modules/services/Groups/UpdateGroup'
import { DeleteGroup } from '@modules/services/Groups/DeleteGroup'

class GroupController {
  async index(request: Request, response: Response): Promise<Response> {
    const listGroups = new ListGroups()

    const groups = await listGroups.execute()

    return response.json(groups)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { group_name, group_permissions } = request.body

    const createGroup = new CreateGroup()

    await createGroup.execute({ group_name, group_permissions })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params

    const findGroup = new FindGroupById()

    const group = await findGroup.execute({ group_id })

    return response.json(group)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { group_name, group_permissions } = request.body
    const { group_id } = request.params

    const updateGroup = new UpdateGroup()

    await updateGroup.execute({
      group_id,
      group_name,
      group_permissions
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params

    const deleteGroup = new DeleteGroup()

    await deleteGroup.execute({ group_id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const groupController = new GroupController()
