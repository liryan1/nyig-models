import { z } from "zod";
import { extendZodObjectForMongoose } from "../../mongoose";
import { zTuition } from "../payment";

export const zClassTracker = z.object({
  /**
   * Mongoose object ID
   */
  course: z.string(),
  /**
   * Mongoose object ID
   */
  teacher: z.string(),
  /**
   * Mongoose object ID
   */
  semester: z.string(),
  classTimes: z.array(z.coerce.date()),
  completedList: z.array(z.boolean()),
  /**
   * Virtual mongoose field when all values in completedList is true
   */
  completed: z.boolean().optional(),
  tuition: zTuition.optional(),
  paid: z.boolean().optional(),
  notes: z.string().optional(),
});

export const zMClassTracker = extendZodObjectForMongoose(zClassTracker);

export type ClassTracker = z.infer<typeof zClassTracker>;
export type MClassTracker = z.infer<typeof zMClassTracker>;
