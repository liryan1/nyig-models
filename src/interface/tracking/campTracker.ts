import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";

export const zCampTracker = z.object({
  course: z.instanceof(Types.ObjectId).or(z.string()),
  teacher: z.instanceof(Types.ObjectId).or(z.string()),
  semester: z.instanceof(Types.ObjectId).or(z.string()),
  /**
   * occurrences are tracked by week for camps
   */
  occurrences: z.array(z.string()),
  /**
   * attendances are tracked by week for camps
   */
  attendances: z.array(z.string()),
  notes: z.string().optional(),
});

export const zMCampTracker = extendZodObjectForMongoose(zCampTracker);

export type CampTracker = z.infer<typeof zCampTracker>;
export type MCampTracker = z.infer<typeof zMCampTracker>;
