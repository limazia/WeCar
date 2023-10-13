import { Request, Response } from 'express'

import { messages } from '@shared/helpers/constants/messages'

import { ListUsersService } from '../services/ListUsersService'
import { CreateUserService } from '../services/CreateUserService'
import { FindUserByIdService } from '../services/FindUserByIdService'
import { DeleteUserService } from '../services/DeleteUserService'
import { UpdateUserService } from '../services/UpdateUserService'

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService()

    const users = await listUsers.execute()

    return response.json(users)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, id_group, password, confirmPassword } = request.body

    const createUser = new CreateUserService()

    await createUser.execute({
      name,
      email,
      id_group,
      password,
      confirmPassword,
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
    const { name, email, id_group, newPassword, confirmPassword } = request.body
    const { id } = request.params

    const updateUser = new UpdateUserService()

    await updateUser.execute({
      id,
      name,
      email,
      id_group,
      newPassword,
      confirmPassword
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
