import { z } from 'zod';

export const SIGNUP_SCHEMA = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    gender: z.enum(["male", "female", "other"], { errorMap: () => ({ message: "Please select a gender" }) }),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});
