import { z } from 'zod'

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirm_password, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm_password"],
  })


export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})


export type SignIn = z.infer<typeof SignInSchema>
export type SignUp = z.infer<typeof SignUpSchema>
