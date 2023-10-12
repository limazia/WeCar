exports.seed = function (knex) {
  return knex("cars").insert([
    {
      car_id: "40e94f14",
      car_km: "84000",
      car_price: "300000",
      car_image:
        "https://motorshow.com.br/wp-content/uploads/sites/2/2018/05/9_ms416_audi-tt-rs2-747x420.jpg",
      car_fuel: "gasoline",
      car_exchange: "automatic",
      car_year: "2019/2020",
      id_model: "d6e0f978",
    },
    {
      car_id: "4a115d4c",
      car_km: "120000",
      car_price: "89000",
      car_image: null,
      car_fuel: "gasoline",
      car_exchange: "automatic",
      car_year: "2017/2017",
      id_model: "45d9b8f4",
    },
    {
      car_id: "4ac38535",
      car_km: "90000",
      car_price: "100000",
      car_image:
        "https://cdn.autopapo.com.br/box/uploads/2021/08/31181151/mercedes-benz-c180-sedan-azul-de-frente-2015.jpg",
      car_fuel: "gasoline",
      car_exchange: "automatic",
      car_year: "2017/2017",
      id_model: "45d9b8f4",
    },
    {
      car_id: "f62b5d47",
      car_km: "12000",
      car_price: "332000",
      car_image:
        "https://s2.glbimg.com/2xcasOKIj3DtHX9bq126Ge10Pbk=/0x0:1600x1100/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/C/L/KEM2XhTiKPgeU33kS4eQ/audi-a5-sportback-2020-1600-01.jpg",
      car_fuel: "gasoline",
      car_exchange: "automatic",
      car_year: "2019/2019",
      id_model: "28024549",
    },
  ]);
};
