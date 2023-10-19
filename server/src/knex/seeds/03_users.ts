import { Knex } from 'knex'
import { genSaltSync, hashSync } from 'bcrypt'

import { master, admin } from '../../../config/user'

exports.seed = async function (knex: Knex): Promise<void> {

  const salt = genSaltSync(10)
  const masterHash = hashSync(master.password, salt)
  const adminHash = hashSync(admin.password, salt)

  const masterData = [
    {
      id: '6iIYWqN7rkufi2r',
      name: master.name,
      email: master.email,
      password: masterHash,
      is_deleteable: false,
      id_group: 'lUA5QoX4VfCvBLu',
    }
  ]

  const adminData = [
    {
      id: 'jSozuFv0SQke8LL',
      name: admin.name,
      email: admin.email,
      password: adminHash,
      id_group: 'puKu42uIc34seKf',
    }
  ]

  await knex.transaction(async (trx) => {
    await trx('users').insert(masterData)
    await trx('users').insert(adminData)

    trx.commit
  })

  console.log('Seed "users" executado com sucesso!')

  return Promise.resolve()
}

