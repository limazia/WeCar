import { Request, Response } from 'express'

import { messages } from '@helpers/constants/messages'

import { ListConfig } from '@modules/services/Config/ListConfig'
import { UpdateConfig } from '@modules/services/Config/UpdateConfig'

class ConfigController {
  async index(request: Request, response: Response): Promise<Response> {
    const listConfig = new ListConfig()

    const config = await listConfig.execute()

    return response.json(config)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      whatsApp,
      facebook,
      instagram,
      address,
      telephone,
      email
    } = request.body

    const updateConfig = new UpdateConfig()

    await updateConfig.execute({
      whatsApp,
      facebook,
      instagram,
      address,
      telephone,
      email,
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }

}

export const configController = new ConfigController()
