exports.seed = function (knex) {
  return knex("professionals").insert([
    {
      model_id: "28024549",
      model_name: "Audi A5",
      model_slug: "a5",
      id_brand: "8c35f1d7",
    },
    {
      model_id: "45d9b8f4",
      model_name: "Mercedes-Benz C180",
      model_slug: "c180",
      id_brand: "30c95faf",
    },
    {
      model_id: "6fd944f9",
      model_name: "BMW 320I",
      model_slug: "320i",
      id_brand: "6385f153",
    },
    {
      model_id: "d6e0f978",
      model_name: "Audi TT",
      model_slug: "tt",
      id_brand: "8c35f1d7",
    },
  ]);
};
