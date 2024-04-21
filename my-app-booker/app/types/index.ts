import { User } from "@prisma/client";

export type SafeUser = Omit<User, 'createdAt'| 'emailVerified' | 'updatedAt' > & {
    createdAt?: string | null;
    updatedAt?: string | null;
    emailVerfied?: string | null;
};