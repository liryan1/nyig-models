import { z } from "zod";

export interface ImageDef {
  url: string;
  height: number;
  width: number;
}

export const zImageDef = z.object({
  url: z.string().url(),
  height: z.coerce.number().int(),
  width: z.coerce.number().int(),
});
