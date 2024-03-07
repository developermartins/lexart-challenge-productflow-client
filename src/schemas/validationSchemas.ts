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

export const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  brand: z.string().min(1, { message: 'Brand is required!' }),
  model: z.string().min(1, { message: 'Model is required!' }),
  price: z.string().min(1, { message: 'Price is required!' }),
  color: z.string().min(1, { message: 'Color is required!' }),
});

export const producWithOptionsValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  brand: z.string().min(1, { message: 'Brand is required!' }),
  model: z.string().min(1, { message: 'Model is required!' }),
  data: z.array(z.object({
    price: z.number().min(1, { message: 'Price is required!' }),
    color: z.string().min(1, { message: 'Color is required!' })
  }))
});

export const resumeValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  resume: z.string().min(1, { message: "Resume is required!" })
});
