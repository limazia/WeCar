import { connection } from '@knex/index'

import { moment } from '@helpers/moment'

import { Web } from '@modules/models/Web'

class ListConfig {
  public async execute(): Promise<Web> {
    const config = await connection('config').first()

    const {
      whatsApp,
      facebook,
      instagram,
      address,
      telephone,
      email,
      updated_at,
    } = config

    return {
      whatsApp,
      facebook,
      instagram,
      address,
      telephone,
      email,
      updated_at: moment(updated_at).format('LL [as] HH:mm'),
    }
  }
}

export { ListConfig }
