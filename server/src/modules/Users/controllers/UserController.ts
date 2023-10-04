import { Request, Response } from 'express'

import { messages } from '@shared/helpers/constants/messages'
import { moment } from '@shared/helpers/moment'

import { ListUsersService } from '../services/ListUsersService'
import { CreateUserService } from '../services/CreateUserService'
import { FindUserByIdService } from '../services/FindUserByIdService'
import { UpdateUserService } from '../services/UpdateUserService'
import { DeleteUserService } from '../services/DeleteUserService'

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService()

    const users = await listUsers.execute()

    const serializedItems = users.map(({
      permissions,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      permissions: permissions ? (permissions as string).split(',').map(permission => permission.trim()) : [],
      updated_at: moment(updated_at).format('LL'),
      created_at: moment(created_at).format('LL'),
    }))

    return response.json({ results: serializedItems })
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, confirm_password, permissions } = request.body

    const createUser = new CreateUserService()

    await createUser.execute({
      name,
      email,
      password,
      confirm_password,
      permissions
    })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const findUser = new FindUserByIdService()

    const user = await findUser.execute({ id })

    return response.json(user)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, confirm_password, permissions } = request.body
    const { id } = request.params

    const updateUser = new UpdateUserService()

    await updateUser.execute({
      id,
      name,
      email,
      password,
      confirm_password,
      permissions
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUser = new DeleteUserService()

    await deleteUser.execute({ id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const userController = new UserController()
