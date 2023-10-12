exports.up = function (knex) {
  return knex.schema.createTable("models", (table) => {
    table.string("model_id").primary();
    table.string("model_name").notNullable();
    table.string("model_slug").notNullable();
    table
      .string("id_brand")
      .notNullable()
      .references("brand_id")
      .inTable("brands")
      .onDelete("CASCADE");

    table
      .timestamp("updateAt")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("models");
};
