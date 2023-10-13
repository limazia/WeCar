import dotenv from 'dotenv'
import { Knex } from 'knex'

dotenv.config({ path: '../../../.env' })

interface KnexConfig {
  [key: string]: Knex.Config
}

const database: KnexConfig = {
  development: {
    client: process.env.DATABASE_DRIVE,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds',
      extension: 'ts'
    },
  },

  production: {
    client: process.env.DATABASE_DRIVE,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      extension: 'ts'
    },
  },
}

export default database
