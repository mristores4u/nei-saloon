import { email, z } from "zod"

const UserRegistrationRequestSchema = z.object({
    email: z.email(),
    First_name: z.string().max(20),
    Last_Name: z.string().max(20),
    Password: z.string(),
    priviPrivilages : z.never().optional(),
    Phone : z.string().optional()
})

export type UserRegistrationRequest =
    z.infer<typeof UserRegistrationRequestSchema>

export { UserRegistrationRequestSchema }