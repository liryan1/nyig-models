import { z } from "zod";

export const zTuition = z.object({
  primary: z.number().int().min(1),
  textbook: z.boolean().optional(),
  shipping: z.boolean().optional(),
});

export type Tuition = z.infer<typeof zTuition>;
