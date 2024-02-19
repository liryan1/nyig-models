import { z } from "zod";
import { zScheduleData } from "./scheduleData";
import { AgeGroup } from "../course";
import { addAutoProps } from "../addAutoProps";

export const zBGroupTracker = z.object({
  course: z.string(),
  teacher: z.string(),
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

export const zGroupTracker = addAutoProps(zBGroupTracker);

export type BGroupTracker = z.infer<typeof zBGroupTracker>;
export type GroupTracker = z.infer<typeof zGroupTracker>;
