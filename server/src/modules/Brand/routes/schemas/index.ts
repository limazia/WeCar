import { z } from 'zod'

export const CarSchema = z.object({
  body: z.object({
    brand_id: z.string().nonempty(),
    brand_name: z.string().nonempty(),
    brand_slug: z.string().nonempty(),
  }),
})

export const ByIdSchema = z.object({
  params: z.object({
    brand_id: z.string().nonempty()
  }),
})

export const ByBrandSchema = z.object({
  params: z.object({
    brand: z.string().nonempty(),
  }),
})
