import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IResult {
  car_id: string;
}

class DeleteCar {
  public async execute({ car_id }: IResult): Promise<void> {
    const car = await connection('cars').where({ car_id }).first()

    if (!car) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('cars').delete().where({ car_id })
  }
}

export { DeleteCar }
