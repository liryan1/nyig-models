import { z } from "zod";
import { extendZodObjectForMongoose } from "../../mongoose";
import { zScheduleData } from "./scheduleData";
import { AgeGroup } from "../course";

export const zGroupTracker = z.object({
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
  scheduleData: zScheduleData,
  /**
   * occurrences are tracked by week for Groups
   */
  occurrences: z.array(z.coerce.date()),
  /**
   * attendances are tracked by week for Groups
   */
  attendances: z.array(z.string()),
  /**
   * ID of the course instance, e.g., 101
   */
  courseId: z.string().optional(),
  /**
   * Age group of the class instance, e.g. "adult", "youth"
   */
  ageGroup: z.nativeEnum(AgeGroup).optional(),
  /**
   * If true, the course is hidden from public view
   */
  isNonPublic: z.boolean().optional(),
  notes: z.string().optional(),
});

export const zMGroupTracker = extendZodObjectForMongoose(zGroupTracker);

export type GroupTracker = z.infer<typeof zGroupTracker>;
export type MGroupTracker = z.infer<typeof zMGroupTracker>;
