import { z } from "zod";

export interface AutoProps {
  _id: string;
  editedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: string;
}

/**
 * Appends auto-populated props for general use-case
 * _id is the MongoDB primary key
 * editedBy is the user ID of the last user
 * createdAt & updatedAt are populated by Mongoose `timestamps: true` option
 */
export function addAutoProps<T extends z.ZodRawShape>(original: z.ZodObject<T>) {
  return original.extend({
    _id: z.string(),
    editedBy: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    isDeleted: z.string().optional(),
  });
}
