import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('config', (table: Knex.TableBuilder) => {
    table.string('whatsApp').notNullable()
    table.string('facebook').notNullable()
    table.string('instagram').notNullable()
    table.string('address').notNullable()
    table.string('telephone').notNullable()
    table.string('email').notNullable()

    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('config')
}
