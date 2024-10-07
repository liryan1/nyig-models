import { z } from "zod";

export const zImageDef = z.object({
  url: z.string().url(),
  height: z.coerce.number().int(),
  width: z.coerce.number().int(),
});

export type ImageDef = z.infer<typeof zImageDef>;
