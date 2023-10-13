import { Request, Response } from 'express'

import { messages } from '@shared/helpers/constants/messages'

import { ListBrandsService } from '../services/ListBrandsService'
import { CreateBrandService } from '../services/CreateBrandService'
import { FindBrandByIdService } from '../services/FindBrandByIdService'
import { UpdateBrandService } from '../services/UpdateBrandService'
import { DeleteBrandService } from '../services/DeleteBrandService'

class BrandController {
  async index(request: Request, response: Response): Promise<Response> {
    const listBrands = new ListBrandsService()

    const brands = await listBrands.execute()

    return response.json(brands)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { brand_name, brand_slug } = request.body

    const createBrand = new CreateBrandService()

    await createBrand.execute({
      brand_name,
      brand_slug,
    })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { brand_id } = request.params

    const findBrand = new FindBrandByIdService()

    const brand = await findBrand.execute({ brand_id })

    return response.json(brand)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { brand_name, brand_slug } = request.body
    const { brand_id } = request.params

    const updateBrand = new UpdateBrandService()

    await updateBrand.execute({
      brand_id,
      brand_name,
      brand_slug
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { brand_id } = request.params

    const deleteBrand = new DeleteBrandService()

    await deleteBrand.execute({ brand_id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const brandController = new BrandController()
