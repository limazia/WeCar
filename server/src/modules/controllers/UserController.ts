import { Request, Response } from 'express'

import { messages } from '@helpers/constants/messages'

import { ListUsers } from '@modules/services/Users/ListUsers'
import { CreateUser } from '@modules/services/Users/CreateUser'
import { FindUserById } from '@modules/services/Users/FindUserById'
import { DeleteUser } from '@modules/services/Users/DeleteUser'
import { UpdateUser } from '@modules/services/Users/UpdateUser'

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsers()

    const users = await listUsers.execute()

    return response.json(users)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, id_group, password, confirmPassword } = request.body

    const createUser = new CreateUser()

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

    const findUser = new FindUserById()

    const user = await findUser.execute({ id })

    return response.json(user)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, id_group, newPassword, confirmPassword } = request.body
    const { id } = request.params

    const updateUser = new UpdateUser()

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

    const deleteUser = new DeleteUser()

    await deleteUser.execute({ id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const userController = new UserController()
