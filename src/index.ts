import { z } from "zod";

export const zStudent = z.object({
  name: z.string(),
});
