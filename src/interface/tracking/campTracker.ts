import { z } from "zod";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zCourse, type Course } from "../course";
import { zSemester, type Semester } from "../semester";
import { zTeacher, type Teacher } from "../user";
import {
  zAttendanceRequest,
  zAttendanceResponse,
  type AttendanceRequest,
  type AttendanceResponse,
} from "./attendance";

const MAX_TEACHERS = 10;

export interface BCampTracker {
  course: string;
  teachers: string[];
  semester: string;
  /**
   * occurrences are tracked by week for camps
   */
  occurrences: string[];
  /**
   * attendances are tracked by week for camps
   */
  attendances: AttendanceRequest[];
  publicDescription?: string;
  isNonPublic?: boolean;
  notes?: string;
}

export interface CampTracker extends BCampTracker, AutoProps {}

export interface CampTrackerResponse extends Omit<
  CampTracker,
  "course" | "teachers" | "semester" | "attendances"
> {
  course: Course;
  teachers: Teacher[];
  semester: Semester;
  attendances: AttendanceResponse[];
}

export const zBCampTracker = z.object({
  course: z.string(),
  teachers: z
    .array(z.string())
    .min(1, "Camp must have at least 1 teacher")
    .max(MAX_TEACHERS, `Camp can have at most ${MAX_TEACHERS} teachers`),
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
  teachers: z
    .array(zTeacher)
    .min(1, "Camp must have at least 1 teacher")
    .max(MAX_TEACHERS, `Camp can have at most ${MAX_TEACHERS} teachers`),
  semester: zSemester,
  attendances: z.array(zAttendanceResponse),
});
