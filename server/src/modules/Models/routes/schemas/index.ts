import { z } from 'zod'

export const ModelSchema = z.object({
  body: z.object({
    model_id: z.string().nonempty(),
    model_name: z.string().nonempty(),
    model_slug: z.string().nonempty(),
    id_brand: z.string().nonempty(),
  }),
})

export const ByIdSchema = z.object({
  params: z.object({
    model_id: z.string().nonempty()
  }),
})
