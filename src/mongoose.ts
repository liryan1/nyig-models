import { z } from "zod";

export function extendZodObjectForMongoose(original: z.AnyZodObject) {
  return original.extend({
    _id: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });
}
