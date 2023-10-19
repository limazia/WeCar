import knex from 'knex'

import database from './knexfile'

export const connection = knex(database[process.env.APP_ENV || 'development'])
