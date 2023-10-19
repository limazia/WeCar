import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('groups', (table: Knex.TableBuilder) => {
    table.string('group_id').primary().notNullable().unique()
    table.string('group_name').notNullable()
    table.text('group_permissions').notNullable().defaultTo('[]')
    table.boolean('is_deleteable').notNullable().defaultTo(true)

    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('groups')
}
