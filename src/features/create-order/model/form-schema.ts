import { z } from "zod";

export const formSchema = z.object({
  author: z
    .string({ required_error: "Author is required" })
    .min(2, { message: "Author must be at least 2 characters" })
    .max(50, { message: "Author must be maximum 50 characters" }),
  title: z
    .string({ required_error: "Title is required" })
    .min(2, { message: "Author must be at least 2 characters" })
    .max(50, { message: "Author must be maximum 50 characters" }),
  deadline: z.coerce
    .number({ required_error: "Deadline is required" })
    .min(1, { message: "Deadline must be greater or equal 1" }),
  technicalTask: z
    .string({ required_error: "Technical task is required" })
    .url({ message: "Invalid url" }),
  price: z.coerce
    .number({ required_error: "Price is required" })
    .min(10000, { message: "Minimal price is 10 000" }),
  categoryId: z.coerce.number({ required_error: "Category is required" }),
  skillsIds: z.array(z.object({ label: z.string(), value: z.string() })),
});
