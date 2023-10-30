import { Knex } from 'knex'

exports.seed = async function (knex: Knex): Promise<void> {
  const config =
  {
    whatsApp: '551999999999',
    facebook: 'wecar',
    instagram: 'wecar',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    telephone: '(123) 4560-7890',
    email: 'contato@wecar.com.br',
  }

  await knex('config').insert(config)

  console.log('Seed "config" executado com sucesso!')

  return Promise.resolve()
}

