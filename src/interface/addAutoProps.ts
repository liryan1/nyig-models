import { z } from "zod";

/**
 * Appends auto-populated props for general use-case
 * _id is the MongoDB primary key
 * editedBy is the user ID of the last user
 * createdAt & updatedAt are populated by Mongoose `timestamps: true` option
 */
export function addAutoProps<T extends z.ZodRawShape>(original: z.ZodObject<T>) {
  return original.extend({
    _id: z.string(),
    editedBy: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });
}
