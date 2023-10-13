import { Request, Response } from 'express'

import { messages } from '@shared/helpers/constants/messages'
import { moment } from '@shared/helpers/moment'

import { ListCarsService } from '../services/ListCarsService'
import { CreateCarService } from '../services/CreateCarService'
import { FindCarsByBrandService } from '../services/FindCarsByBrandService'
import { FindCarsByIdService } from '../services/FindCarsByIdService'
import { UpdateCarService } from '../services/UpdateCarService'
import { DeleteCarService } from '../services/DeleteCarService'

class CarController {
  async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 10 } = request.query

    const parsedPage = parseInt(page as string)
    const parsedLimit = parseInt(limit as string)

    const listCars = new ListCarsService()

    const cars = await listCars.execute({ page: parsedPage, limit: parsedLimit })

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
      id_model,
    } = request.body

    const createCar = new CreateCarService()

    await createCar.execute({
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      id_model,
    })

    return response.json({ message: messages.success.SUCCESSFULLY_REGISTERED })
  }

  async listByBrand(request: Request, response: Response): Promise<Response> {
    const { brand, model } = request.params

    const findCarsByBrand = new FindCarsByBrandService()

    const cars = await findCarsByBrand.execute({ brand, model })

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

    const findCar = new FindCarsByIdService()

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

    const updateCar = new UpdateCarService()

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

    const deleteCar = new DeleteCarService()

    await deleteCar.execute({ car_id })

    return response.json({ message: messages.success.RECORD_DELETED })
  }
}

export const carController = new CarController()
