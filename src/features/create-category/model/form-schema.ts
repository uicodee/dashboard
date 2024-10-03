import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/svg+xml"];

export const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be maximum 50 characters" }),
  photo:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files.length === 1, "Please upload a single file")
          .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
            "Unsupported file type"
          )
          .refine(
            (files) => files[0]?.size <= MAX_FILE_SIZE,
            `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
          ),
});
