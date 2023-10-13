import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('brands', (table: Knex.TableBuilder) => {
    table.string('brand_id').primary().notNullable().unique()
    table.string('brand_name').notNullable()
    table.string('brand_slug').notNullable()

    table
      .timestamp('update_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('brands')
}
