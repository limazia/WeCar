import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.string('id').primary().notNullable().unique()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.boolean('is_deleteable').notNullable().defaultTo(true)
    table.string('id_group').notNullable()

    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
