exports.seed = function (knex) {
  return knex("brands").insert([
    {
      brand_id: "30c95faf",
      brand_name: "Mercedes Benz",
      brand_slug: "mercedes-benz",
    },
    {
      brand_id: "6385f153",
      brand_name: "BMW",
      brand_slug: "bmw",
    },
    {
      brand_id: "8c35f1d7",
      brand_name: "Audi",
      brand_slug: "audi",
    },
  ]);
};
