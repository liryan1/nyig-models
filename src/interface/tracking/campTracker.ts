import { z } from "zod";
import { addAutoProps } from "../addAutoProps";
import { zCourse } from "../course";
import { zSemester } from "../semester";
import { zTeacher } from "../user";
import { zAttendanceRequest, zAttendanceResponse } from "./attendance";

export const zBCampTracker = z.object({
  course: z.string(),
  teacher: z.string(),
  semester: z.string(),
  /**
   * occurrences are tracked by week for camps
   */
  occurrences: z.array(z.string()).min(1, "Camp must have at least 1 date range"),
  /**
   * attendances are tracked by week for camps
   */
  attendances: z.array(zAttendanceRequest),
  publicDescription: z.string().optional(),
  isNonPublic: z.boolean().optional(),
  notes: z.string().optional(),
});

export const zCampTracker = addAutoProps(zBCampTracker);
export const zCampTrackerResponse = zCampTracker.extend({
  course: zCourse,
  teacher: zTeacher,
  semester: zSemester,
  attendances: z.array(zAttendanceResponse),
});

export type BCampTracker = z.infer<typeof zBCampTracker>;
export type CampTracker = z.infer<typeof zCampTracker>;
export type CampTrackerResponse = z.infer<typeof zCampTrackerResponse>;
