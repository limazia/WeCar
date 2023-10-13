import { Request, Response } from 'express'

import { messages } from '@shared/helpers/constants/messages'

import { MyAccountService } from '../services/MyAccountService'
import { UpdateAccountService } from '../services/UpdateAccountService'

class AccountController {
  async account(request: Request, response: Response): Promise<Response> {
    const id = request.user.id

    const myAccount = new MyAccountService()

    const account = await myAccount.execute({ id })

    return response.json(account)
  }

  async updateByScope(request: Request, response: Response): Promise<Response> {
    const { name, email, password, new_password, confirm_password } = request.body
    const { scope, id } = request.params

    const updateUser = new UpdateAccountService()

    await updateUser.execute({
      scope,
      id,
      name,
      email,
      password,
      new_password,
      confirm_password
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }
}

export const accountController = new AccountController()
