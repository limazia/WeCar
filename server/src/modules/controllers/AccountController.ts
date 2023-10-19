import { Request, Response } from 'express'

import { messages } from '@helpers/constants/messages'

import { MyAccount } from '@modules/services/Users/MyAccount'
import { UpdateAccount } from '@modules/services/Users/UpdateAccount'

class AccountController {
  async account(request: Request, response: Response): Promise<Response> {
    const id = request.user.id

    const myAccount = new MyAccount()

    const account = await myAccount.execute({ id })

    return response.json(account)
  }

  async updateByScope(request: Request, response: Response): Promise<Response> {
    const { name, email, password, newPassword, confirmPassword } = request.body
    const { scope, id } = request.params

    const updateUser = new UpdateAccount()

    await updateUser.execute({
      scope,
      id,
      name,
      email,
      password,
      newPassword,
      confirmPassword
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }
}

export const accountController = new AccountController()
