import { z } from "zod";

export const signInSchema = z.object({
  // both
  email: z.string().email(),
  password: z.string().min(8),
});


export const signUpSchema = z.object({
    // sign-up
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    address1: z.string().min(3).max(50),
    city: z.string().min(3),
    state: z.string().max(50),
    postalCode: z.string().min(3).max(6),
    dateOfBirth: z.string().min(3),
    ssn: z.string().min(3),
  
    // both
    email: z.string().email(),
    password: z.string().min(8),
})