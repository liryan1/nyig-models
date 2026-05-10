import { z } from "zod";

export interface Tuition {
  primary: number;
  textbook?: boolean;
  shipping?: boolean;
}

export const zTuition = z.object({
  primary: z.number().int().min(1),
  textbook: z.boolean().optional(),
  shipping: z.boolean().optional(),
});

export enum FeesInCents {
  "MATERIAL" = 100_00,
  "SHIPPING" = 20_00,
}
