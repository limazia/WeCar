import { z } from 'zod'

export const CarSchema = z.object({
  body: z.object({
    car_km: z.string().nonempty(),
    car_price: z.string().nonempty(),
    car_image: z.string().nonempty(),
    car_fuel: z.string().nonempty(),
    car_exchange: z.string().nonempty(),
    car_year: z.string().nonempty(),
    car_observation: z.string().nonempty(),
    id_model: z.string().nonempty(),
  }),
})

export const ByIdSchema = z.object({
  params: z.object({
    car_id: z.string().nonempty()
  }),
})

export const ByBrandSchema = z.object({
  params: z.object({
    brand: z.string().nonempty(),
    model: z.string().nonempty(),
  }),
})
