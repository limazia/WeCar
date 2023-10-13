import { Request, Response } from 'express'

import { messages } from '@shared/helpers/constants/messages'
import { moment } from '@shared/helpers/moment'

import { ListBrandsService } from '../services/ListBrandsService'
import { CreateBrandService } from '../services/CreateBrandService'
import { FindBrandService } from '../services/FindBrandService'
import { FindBrandByIdService } from '../services/FindBrandByIdService'
import { UpdateBrandService } from '../services/UpdateBrandService'
import { DeleteBrandService } from '../services/DeleteBrandService'

class BrandController {
  async index(request: Request, response: Response): Promise<Response> {
    const listBrands = new ListBrandsService()

    const brands = await listBrands.execute()

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

  async create(request: Request, response: Response): Promise<Response> {
    const { brand_name, brand_slug } = request.body

    const createBrand = new CreateBrandService()

    await createBrand.execute({
      brand_name,
      brand_slug,
    })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async listByBrand(request: Request, response: Response): Promise<Response> {
    const { brand } = request.params

    const findBrand = new FindBrandService()

    const brands = await findBrand.execute({ brand })

    const serializedItems = brands.map(({
      model_name,
      model_slug,
      car_id,
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      model_name,
      model_slug,
      car_id,
      car_km: Number(car_km),
      car_price: Number(car_price),
      car_image: car_image ? (car_image as string).split(',').map(image => image.trim()) : [],
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      updated_at: moment(updated_at).format('DD [de] MMMM, YYYY'),
      created_at: moment(created_at).format('DD [de] MMMM, YYYY'),
    }))

    return response.json({ results: serializedItems })
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
