import { Request, Response } from 'express'

import { messages } from '@helpers/constants/messages'

import { ListBrands } from '@modules/services/Brands/ListBrands'
import { CreateBrand } from '@modules/services/Brands/CreateBrand'
import { FindBrandById } from '@modules/services/Brands/FindBrandById'
import { UpdateBrand } from '@modules/services/Brands/UpdateBrand'
import { DeleteBrand } from '@modules/services/Brands/DeleteBrand'

class BrandController {
  async index(request: Request, response: Response): Promise<Response> {
    const listBrands = new ListBrands()

    const brands = await listBrands.execute()

    return response.json(brands)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { brand_name, brand_slug } = request.body

    const createBrand = new CreateBrand()

    await createBrand.execute({
      brand_name,
      brand_slug,
    })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { brand_id } = request.params

    const findBrand = new FindBrandById()

    const brand = await findBrand.execute({ brand_id })

    return response.json(brand)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { brand_name, brand_slug } = request.body
    const { brand_id } = request.params

    const updateBrand = new UpdateBrand()

    await updateBrand.execute({
      brand_id,
      brand_name,
      brand_slug
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { brand_id } = request.params

    const deleteBrand = new DeleteBrand()

    await deleteBrand.execute({ brand_id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const brandController = new BrandController()
