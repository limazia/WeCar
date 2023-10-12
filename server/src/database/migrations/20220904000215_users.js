exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.text("permissions").notNullable().defaultTo("[]");

    table
      .timestamp("updateAt")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
