import { Knex } from 'knex'

exports.seed = async function (knex: Knex): Promise<void> {
  const groups = [
    {
      group_id: 'lUA5QoX4VfCvBLu',
      group_name: 'Master',
      group_permissions: 'admin',
      is_deleteable: false,
    },
    {
      group_id: 'puKu42uIc34seKf',
      group_name: 'Administrador',
      group_permissions: 'admin',
      is_deleteable: true,
    },
  ]

  await knex('groups').insert(groups)

  console.log('Seed "groups" executado com sucesso!')

  return Promise.resolve()
}

