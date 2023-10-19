import { Request, Response } from 'express'

import { messages } from '@helpers/constants/messages'
import { moment } from '@helpers/moment'

import { ListModels } from '@modules/services/Models/ListModels'
import { CreateModel } from '@modules/services/Models/CreateModel'
import { ListBrandBySlug } from '@modules/services/Models/ListBrandBySlug'
import { FindModelById } from '@modules/services/Models/FindModelById'
import { UpdateModel } from '@modules/services/Models/UpdateModel'
import { DeleteModel } from '@modules/services/Models/DeleteModelService'

class ModelController {
  async index(request: Request, response: Response): Promise<Response> {
    const listModels = new ListModels()

    const models = await listModels.execute()

    return response.json(models)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { model_name, model_slug, id_brand } = request.body

    const createModel = new CreateModel()

    await createModel.execute({
      model_name,
      model_slug,
      id_brand
    })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async listByBrandSlug(request: Request, response: Response): Promise<Response> {
    const { brand_slug } = request.params

    const listBrand = new ListBrandBySlug()

    const brands = await listBrand.execute({ brand_slug })

    const serializedItems = brands.map(({
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      updated_at: moment(updated_at).format('LL'),
      created_at: moment(created_at).format('LL'),
    }))

    return response.json({ results: serializedItems })
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { model_id } = request.params

    const findModel = new FindModelById()

    const model = await findModel.execute({ model_id })

    return response.json(model)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { model_name, model_slug, id_brand } = request.body
    const { model_id } = request.params

    const updateModel = new UpdateModel()

    await updateModel.execute({
      model_id,
      model_name,
      model_slug,
      id_brand
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { model_id } = request.params

    const deleteModel = new DeleteModel()

    await deleteModel.execute({ model_id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const modelController = new ModelController()
