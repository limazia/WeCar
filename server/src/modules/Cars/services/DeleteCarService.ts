import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { connection } from '@shared/knex'

interface IResult {
  car_id: string;
}

class DeleteCarService {
  public async execute({ car_id }: IResult): Promise<void> {
    const car = await connection('cars').where({ car_id }).first()

    if (!car) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    await connection('cars').delete().where({ car_id })
  }
}

export { DeleteCarService }
