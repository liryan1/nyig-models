import { z } from "zod";
import { zScheduleData } from "./scheduleData";
import { AgeGroup, zCourse } from "../course";
import { addAutoProps } from "../addAutoProps";
import { zTeacher } from "../user";
import { zSemester } from "../semester";
import { zAttendanceRequest, zAttendanceResponse } from "./attendance";

export const zBGroupTracker = z.object({
  course: z.string(),
  teacher: z.string(),
  semester: z.string(),
  scheduleData: zScheduleData,
  /**
   * occurrences are tracked by week for Groups
   */
  occurrences: z.array(z.string()),
  /**
   * attendances are tracked by week for Groups
   */
  attendances: z.array(zAttendanceRequest),
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

export const zGroupTrackerResponse = zGroupTracker.extend({
  course: zCourse,
  teacher: zTeacher,
  semester: zSemester,
  attendances: z.array(zAttendanceResponse),
});

export type BGroupTracker = z.infer<typeof zBGroupTracker>;
export type GroupTracker = z.infer<typeof zGroupTracker>;
export type GroupTrackerResponse = z.infer<typeof zGroupTrackerResponse>;
