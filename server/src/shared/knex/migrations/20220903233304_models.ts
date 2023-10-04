import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('models', (table: Knex.TableBuilder) => {
    table.string('model_id').primary().notNullable().unique()
    table.string('model_name').notNullable()
    table.string('model_slug').notNullable()
    table
      .string('id_brand')
      .notNullable()
      .references('brand_id')
      .inTable('brands')
      .onDelete('CASCADE')

    table
      .timestamp('update_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('models')
}
