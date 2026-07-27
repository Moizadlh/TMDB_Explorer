import { z } from 'zod';

export const LOGIN_SCHEMA = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
});
