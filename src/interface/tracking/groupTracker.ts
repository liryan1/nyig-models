import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";
import { zScheduleData } from "./scheduleData";
import { AgeGroup } from "../course";
import { Types } from "mongoose";

export const zGroupTracker = z.object({
  course: z.instanceof(Types.ObjectId),
  teacher: z.instanceof(Types.ObjectId),
  semester: z.instanceof(Types.ObjectId),
  scheduleData: zScheduleData,
  /**
   * occurrences are tracked by week for Groups
   */
  occurrences: z.array(z.coerce.date()),
  /**
   * attendances are tracked by week for Groups
   */
  attendances: z.array(z.instanceof(Types.ObjectId)),
  /**
   * public-facing ID of the course instance, e.g., 101
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
