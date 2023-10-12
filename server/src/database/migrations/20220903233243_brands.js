exports.up = function (knex) {
  return knex.schema.createTable("brands", (table) => {
    table.string("brand_id").primary();
    table.string("brand_name").notNullable();
    table.string("brand_slug").notNullable();
    
    table
      .timestamp("updateAt")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("brands");
};
