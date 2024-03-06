import { z } from "zod";

export const userLoginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required!' }),
  password: z.string().min(1, { message: 'Password is required!' }),
});

export const userRegisterFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required!' }),
  email: z.string().min(1, { message: 'Email is required!' }),
  password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
});

export const userUpdatePasswordFormSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required!' }),
  newPassword: z.string().min(8, { message: "Password must be atleast 8 characters" }),
  confirmPassword: z.string().min(1, { message: 'Please, confirm password.' }),
}).superRefine(({ newPassword, confirmPassword }, res) => {
  confirmPassword !== newPassword && res.addIssue({
    code: 'custom',
    path: ['confirmPassword'],
    message: 'The passwords did not match'
  });
});

export const userUpdateEmailFormSchema = z.object({
  currentEmail: z.string().min(1, { message: 'Email is required!' }),
  newEmail: z.string().min(1, { message: "A new email is required" }).email({
    message: "Must be a valid email",
  }),
});

export const usernameUpdateFormSchema = z.object({
  newUsername: z.string().min(1, { message: 'A new username is required!' })
});

export const postValidationSchema = z.object({
  title: z.string().min(1, { message: 'Title is required!' }),
  description: z.string().min(1, { message: 'Description is required!' }),
  stackList:  z.string().min(1, { message: 'Stakcs are required!' }).transform(stack => {
    return stack.split(',')
  }),
});

export const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  brand: z.string().min(1, { message: 'Brand is required!' }),
  model: z.string().min(1, { message: 'Model is required!' }),
  price: z.string().min(1, { message: 'Price is required!' }),
  color: z.string().min(1, { message: 'Color is required!' }),
  // stackList:  z.string().min(1, { message: 'Stakcs are required!' }).transform(stack => {
  //   return stack.split(',')
  // }),
});

export const resumeValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  resume: z.string().min(1, { message: "Resume is required!" })
});
