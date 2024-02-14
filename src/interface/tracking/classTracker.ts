import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";
import { zTuition } from "../payment";

export const zClassTracker = z.object({
  course: z.instanceof(Types.ObjectId).or(z.string()),
  teacher: z.instanceof(Types.ObjectId).or(z.string()),
  student: z.instanceof(Types.ObjectId).or(z.string()),
  classTimes: z.array(z.coerce.date()),
  completedList: z.array(z.boolean()),
  /**
   * Virtual mongoose field when all values in completedList is true
   */
  completed: z.boolean().optional(),
  tuition: zTuition.optional(),
  paid: z.boolean().optional(),
  paused: z.boolean().optional(),
  notes: z.string().optional(),
});

export const zMClassTracker = extendZodObjectForMongoose(zClassTracker);

export type ClassTracker = z.infer<typeof zClassTracker>;
export type MClassTracker = z.infer<typeof zMClassTracker>;
