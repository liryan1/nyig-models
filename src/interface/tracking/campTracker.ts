import { z } from "zod";
import { addAutoProps } from "../addAutoProps";
import { zSemester } from "../semester";
import { zTeacher } from "../user";
import { zCourse } from "../course";
import { zAttendance, zAttendanceRequest } from "./attendance";

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
  attendances: z.array(z.string()),
  publicDescription: z.string().optional(),
  isNonPublic: z.boolean().optional(),
  notes: z.string().optional(),
});

export const zCampTracker = addAutoProps(zBCampTracker);
export const zCampTrackerRequest = zCampTracker.extend({
  attendances: zAttendanceRequest,
});
export const zCampTrackerResponse = zCampTracker.extend({
  course: zCourse,
  teacher: zTeacher,
  semester: zSemester,
  attendances: zAttendance,
});

export type BCampTracker = z.infer<typeof zBCampTracker>;
export type CampTracker = z.infer<typeof zCampTracker>;
export type CampTrackerRequest = z.infer<typeof zCampTrackerRequest>;
export type CampTrackerResponse = z.infer<typeof zCampTrackerResponse>;
