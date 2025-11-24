import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  PORT: z.string().default("4000"),
});

export const env = envSchema.parse(process.env);
