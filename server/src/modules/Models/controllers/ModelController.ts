import { Request, Response } from 'express'

import { messages } from '@shared/helpers/constants/messages'
import { moment } from '@shared/helpers/moment'

import { ListModelsService } from '../services/ListModelsService'
import { CreateModelService } from '../services/CreateModelService'
import { ListBrandBySlugService } from '../services/ListBrandBySlugService'
import { FindModelByIdService } from '../services/FindModelByIdService'
import { UpdateModelService } from '../services/UpdateModelService'
import { DeleteModelService } from '../services/DeleteModelService'

class ModelController {
  async index(request: Request, response: Response): Promise<Response> {
    const listModels = new ListModelsService()

    const models = await listModels.execute()

    return response.json(models)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { model_name, model_slug, id_brand } = request.body

    const createModel = new CreateModelService()

    await createModel.execute({
      model_name,
      model_slug,
      id_brand
    })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async listByBrandSlug(request: Request, response: Response): Promise<Response> {
    const { brand_slug } = request.params

    const listBrand = new ListBrandBySlugService()

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

    const findModel = new FindModelByIdService()

    const model = await findModel.execute({ model_id })

    return response.json(model)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { model_name, model_slug, id_brand } = request.body
    const { model_id } = request.params

    const updateModel = new UpdateModelService()

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

    const deleteModelService = new DeleteModelService()

    await deleteModelService.execute({ model_id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const modelController = new ModelController()
