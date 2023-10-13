import { Knex } from 'knex'

exports.seed = async function (knex: Knex): Promise<void> {
  const brandsData = [
    {
      brand_id: '30c95faf',
      brand_name: 'Mercedes Benz',
      brand_slug: 'mercedes-benz',
    },
    {
      brand_id: '6385f153',
      brand_name: 'BMW',
      brand_slug: 'bmw',
    },
    {
      brand_id: '8c35f1d7',
      brand_name: 'Audi',
      brand_slug: 'audi',
    },
  ]

  const modelsData = [
    {
      model_id: '28024549',
      model_name: 'Audi A5',
      model_slug: 'a5',
      id_brand: '8c35f1d7',
    },
    {
      model_id: '45d9b8f4',
      model_name: 'Mercedes-Benz C180',
      model_slug: 'c180',
      id_brand: '30c95faf',
    },
    {
      model_id: '6fd944f9',
      model_name: 'BMW 320I',
      model_slug: '320i',
      id_brand: '6385f153',
    },
    {
      model_id: 'd6e0f978',
      model_name: 'Audi TT',
      model_slug: 'tt',
      id_brand: '8c35f1d7',
    },
  ]

  const carsData = [
    {
      car_id: '40e94f14',
      car_km: '84000',
      car_price: '300000',
      car_image:
        'https://motorshow.com.br/wp-content/uploads/sites/2/2018/05/9_ms416_audi-tt-rs2-747x420.jpg',
      car_fuel: 'gasoline',
      car_exchange: 'automatic',
      car_year: '2019/2020',
      id_model: 'd6e0f978',
    },
    {
      car_id: '4a115d4c',
      car_km: '120000',
      car_price: '89000',
      car_image: null,
      car_fuel: 'gasoline',
      car_exchange: 'automatic',
      car_year: '2017/2017',
      id_model: '45d9b8f4',
    },
    {
      car_id: '4ac38535',
      car_km: '90000',
      car_price: '100000',
      car_image: '',
      car_fuel: 'gasoline',
      car_exchange: 'automatic',
      car_year: '2017/2017',
      id_model: '45d9b8f4',
    },
    {
      car_id: 'f62b5d47',
      car_km: '12000',
      car_price: '332000',
      car_image:
        'https://s2.glbimg.com/2xcasOKIj3DtHX9bq126Ge10Pbk=/0x0:1600x1100/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/C/L/KEM2XhTiKPgeU33kS4eQ/audi-a5-sportback-2020-1600-01.jpg',
      car_fuel: 'gasoline',
      car_exchange: 'automatic',
      car_year: '2019/2019',
      id_model: '28024549',
    },
  ]

  await knex.transaction(async (trx) => {
    await trx('brands').insert(brandsData)
    await trx('models').insert(modelsData)
    await trx('cars').insert(carsData)

    trx.commit
  })

  console.log('Seed "cars" executado com sucesso!')

  return Promise.resolve()
}

/*
https://image.webmotors.com.br/_fotos/anunciousados/gigante/2022/202208/20220804/mercedesbenz-c-180-1.6-cgi-16v-turbo-flex-4p-automatico-wmimagem18175046526.jpg?s=fill&w=1920&h=1440&q=75,
https://image.webmotors.com.br/_fotos/anunciousados/gigante/2022/202208/20220804/mercedesbenz-c-180-1.6-cgi-16v-turbo-flex-4p-automatico-wmimagem18175165221.jpg?s=fill&w=1920&h=1440&q=75,
https://image.webmotors.com.br/_fotos/anunciousados/gigante/2022/202208/20220804/mercedesbenz-c-180-1.6-cgi-16v-turbo-flex-4p-automatico-wmimagem18175307421.jpg?s=fill&w=1920&h=1440&q=75,
https://image.webmotors.com.br/_fotos/anunciousados/gigante/2022/202208/20220804/mercedesbenz-c-180-1.6-cgi-16v-turbo-flex-4p-automatico-wmimagem18175484038.jpg?s=fill&w=1920&h=1440&q=75,
https://image.webmotors.com.br/_fotos/anunciousados/gigante/2022/202208/20220804/mercedesbenz-c-180-1.6-cgi-16v-turbo-flex-4p-automatico-wmimagem18175518440.jpg?s=fill&w=1920&h=1440&q=75,
https://image.webmotors.com.br/_fotos/anunciousados/gigante/2022/202208/20220804/mercedesbenz-c-180-1.6-cgi-16v-turbo-flex-4p-automatico-wmimagem18175643437.jpg?s=fill&w=1920&h=1440&q=75,
https://image.webmotors.com.br/_fotos/anunciousados/gigante/2022/202208/20220804/mercedesbenz-c-180-1.6-cgi-16v-turbo-flex-4p-automatico-wmimagem18175940226.jpg?s=fill&w=1920&h=1440&q=75
*/
