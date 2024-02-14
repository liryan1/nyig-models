import { z } from "zod";
import { Types } from "mongoose";

export function extendZodObjectForMongoose<T extends z.ZodRawShape>(original: z.ZodObject<T>) {
  return original.extend({
    _id: z.instanceof(Types.ObjectId).or(z.string()),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });
}
