import { z } from "zod";

export const zImageDef = z.object({
  url: z.string(),
  height: z.number(),
  width: z.number(),
});

export type ImageDef = z.infer<typeof zImageDef>;
