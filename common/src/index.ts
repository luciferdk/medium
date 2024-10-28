import { z } from "zod";

export const signupInput = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	fullName: z.string().optional()
})

export const signinInput = z.object({
    email: z.string().email(),
	password: z.string().min(6)
})

const createBlogInput = z.object({
    title: z.string(),
	content: z.string(),
	authorName: z.string()
})

const updateBlogInput = z.object({
    title: z.string(),
	content: z.string(),
	authorName: z.string(),
    id: z.any(),
})

const updateBio = z.object({
	fullName: z.string(),
	bio: z.string()
})

//type inference in zod
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type  updateBio = z.infer<typeof updateBio>