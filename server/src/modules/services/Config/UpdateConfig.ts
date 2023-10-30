import { connection } from '@knex/index'

interface IRequest {
  whatsApp: string;
  facebook: string;
  instagram: string;
  address: string;
  telephone: string;
  email: string;
}

class UpdateConfig {
  public async execute({
    whatsApp,
    facebook,
    instagram,
    address,
    telephone,
    email,
  }: IRequest): Promise<void> {
    const config = await connection('config').first()

    config.whatsApp = whatsApp
    config.facebook = facebook
    config.instagram = instagram
    config.address = address
    config.telephone = telephone
    config.email = email

    await connection('config').update(config)
  }
}

export { UpdateConfig }
