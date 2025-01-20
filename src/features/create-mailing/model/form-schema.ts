import { z } from "zod";

export const formSchema = z.object({
  message: z.string().min(8),
});
