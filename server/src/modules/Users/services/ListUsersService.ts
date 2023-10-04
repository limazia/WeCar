import { connection } from '@shared/knex'

import { User } from '../interfaces/User'

class ListUsersService {
  public async execute(): Promise<User[]> {
    const users = await connection('users').orderBy('created_at', 'asc')

    return users || []
  }
}

export { ListUsersService }
