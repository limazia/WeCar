import { z } from 'zod'

export const UpdateSchema = z.object({
  params: z.object({
    scope: z.string().nonempty(),
    id: z.string().nonempty(),
  }),
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    new_password: z.string(),
    confirm_password: z.string(),
  }).refine((data) => data.new_password === data.confirm_password, {
    message: 'As senhas não coincidem',
    path: ['confirm_password'],
  })
})

export const SessionSchema = z.object({
  body: z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  }),
})

export const UserSchema = z.object({
  body: z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
    permissions: z.string().nonempty(),
  }),
})

export const ByIdSchema = z.object({
  params: z.object({
    id: z.string().nonempty()
  }),
})
