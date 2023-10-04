import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
    table.string('car_id').primary().notNullable().unique()
    table.string('car_km').notNullable()
    table.string('car_price').notNullable()
    table.text('car_image')
    table
      .enu('car_fuel', ['gasoline', 'flex', 'diesel', 'electric', 'hybrid'])
      .notNullable()
      .defaultTo(null)
    table
      .enu('car_exchange', ['automatic', 'manual'])
      .notNullable()
      .defaultTo(null)
    table.string('car_year').notNullable()
    table.text('car_observation')
    table
      .string('id_model')
      .notNullable()
      .references('model_id')
      .inTable('models')
      .onDelete('CASCADE')

    table
      .timestamp('update_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars')
}
