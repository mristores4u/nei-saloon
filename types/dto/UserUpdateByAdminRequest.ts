import z from "zod";

const UserUpdateByAdminRequestSchema = z.object(
  {
    User_id : z.never().optional(),
    email: z.email().optional(),
    First_name: z.string().max(20).optional(),
    Last_Name: z.string().max(20).optional(),
    Password: z.never().optional(),
    Phone: z.string().optional(),
    profileImage: z.string().optional(),
    Role: z.never().optional(),
    Status: z.never().optional(),
    Privilages: z.never().optional()
  }
)

export type UserSelfUpdateRequest = z.infer<typeof UserUpdateByAdminRequestSchema>

export { UserUpdateByAdminRequestSchema }