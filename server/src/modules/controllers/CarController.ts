import { Request, Response } from 'express'

import { messages } from '@helpers/constants/messages'
import { moment } from '@helpers/moment'

import { ListCars } from '@modules/services/Cars/ListCars'
import { CreateCar } from '@modules/services/Cars/CreateCar'
import { ListByBrandAndModelSlug } from '@modules/services/Cars/ListByBrandAndModelSlug'
import { ListByBrandSlug } from '@modules/services/Cars/ListByBrandSlug'
import { FindCarsById } from '@modules/services/Cars/FindCarsById'
import { UpdateCar } from '@modules/services/Cars/UpdateCar'
import { DeleteCar } from '@modules/services/Cars/DeleteCar'

class CarController {
  async index(request: Request, response: Response): Promise<Response> {
    const listCars = new ListCars()

    const cars = await listCars.execute()

    return response.json(cars)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      id_model
    } = request.body

    const createCar = new CreateCar()

    await createCar.execute({
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      id_model
    })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async listByBrandSlug(request: Request, response: Response): Promise<Response> {
    const { brand_slug } = request.params

    const findCarsByBrandSlug = new ListByBrandSlug()

    const cars = await findCarsByBrandSlug.execute({ brand_slug })

    const serializedItems = cars.map(({
      car_km,
      car_price,
      car_image,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      car_km: Number(car_km),
      car_price: Number(car_price),
      car_image: car_image ? (car_image as string).split(',').map(image => image.trim()) : [],
      updated_at: moment(updated_at).format('DD [de] MMMM, YYYY'),
      created_at: moment(created_at).format('DD [de] MMMM, YYYY'),
    }))

    return response.json({ results: serializedItems })
  }
  async listByBrandAndModelSlug(request: Request, response: Response): Promise<Response> {
    const { brand_slug, model_slug } = request.params

    const findCarsByBrand = new ListByBrandAndModelSlug()

    const cars = await findCarsByBrand.execute({ brand_slug, model_slug })

    const serializedItems = cars.map(({
      car_km,
      car_price,
      car_image,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      car_km: Number(car_km),
      car_price: Number(car_price),
      car_image: car_image ? (car_image as string).split(',').map(image => image.trim()) : [],
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }))

    return response.json({ results: serializedItems })
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params

    const findCar = new FindCarsById()

    const car = await findCar.execute({ car_id })

    return response.json(car)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      id_model
    } = request.body
    const { car_id } = request.params

    const updateCar = new UpdateCar()

    await updateCar.execute({
      car_id,
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      id_model
    })

    return response.json({ message: messages.success.RECORD_SUCCESSFULLY_UPDATED })
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params

    const deleteCar = new DeleteCar()

    await deleteCar.execute({ car_id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const carController = new CarController()
