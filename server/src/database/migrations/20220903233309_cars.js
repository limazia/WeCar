exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.string("car_id").primary();
    table.string("car_km").notNullable();
    table.string("car_price").notNullable();
    table.text("car_image").notNullable();
    table
      .enu("car_fuel", ["gasoline", "flex", "diesel", "electric", "hybrid"])
      .defaultTo(null);
    table.enu("car_exchange", ["automatic", "manual"]).defaultTo(null);
    table.string("car_year").notNullable();
    table.text("car_observation");
    table
      .string("id_model")
      .notNullable()
      .references("model_id")
      .inTable("models")
      .onDelete("CASCADE");

    table
      .timestamp("updateAt")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cars");
};
