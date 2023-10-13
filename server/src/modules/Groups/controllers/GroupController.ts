import { Request, Response } from 'express'

import { messages } from '@shared/helpers/constants/messages'

import { ListGroupsService } from '../services/ListGroupsService'
import { CreateGroupService } from '../services/CreateGroupService'
import { FindGroupByIdService } from '../services/FindGroupByIdService'
import { UpdateGroupService } from '../services/UpdateGroupService'
import { DeleteGroupService } from '../services/DeleteGroupService'

class GroupController {
  async index(request: Request, response: Response): Promise<Response> {
    const listGroups = new ListGroupsService()

    const groups = await listGroups.execute()

    return response.json(groups)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { group_name, group_permissions } = request.body

    const createGroup = new CreateGroupService()

    await createGroup.execute({ group_name, group_permissions })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params

    const findGroup = new FindGroupByIdService()

    const group = await findGroup.execute({ group_id })

    return response.json(group)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { group_name, group_permissions } = request.body
    const { group_id } = request.params

    const updateGroup = new UpdateGroupService()

    await updateGroup.execute({
      group_id,
      group_name,
      group_permissions
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params

    const deleteGroup = new DeleteGroupService()

    await deleteGroup.execute({ group_id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const groupController = new GroupController()
