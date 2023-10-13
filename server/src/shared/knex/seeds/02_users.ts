import { Knex } from 'knex'

exports.seed = async function (knex: Knex): Promise<void> {
  const userData = [
    {
      id: '0361ddbbcc92022',
      name: 'Acacio de Lima',
      email: 'limadeacacio@gmail.com',
      password: '$2b$10$/HR6ESB8JitGblj4N5AgqeY6jxqifHfxYn//IUxYVLhgEeNCYugsm', // 1234
      permissions: 'admin',
    },
  ]

  await knex('users').insert(userData)

  console.log('Seed "users" executado com sucesso!')

  return Promise.resolve()
}

