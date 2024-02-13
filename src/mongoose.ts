import { z } from "zod";

export function extendZodObjectForMongoose<T extends z.ZodRawShape>(original: z.ZodObject<T>) {
  return original.extend({
    _id: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });
}
