import { z } from "zod";
import { zScheduleData, type ScheduleData } from "./scheduleData";
import { AgeGroup, zCourse, type Course } from "../course";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zTeacher, type Teacher } from "../user";
import { zSemester, type Semester } from "../semester";
import {
  zAttendanceRequest,
  zAttendanceResponse,
  type AttendanceRequest,
  type AttendanceResponse,
} from "./attendance";

export interface BGroupTracker {
  course: string;
  teacher: string;
  semester: string;
  scheduleData: ScheduleData;
  /**
   * occurrences are tracked by week for Groups
   */
  occurrences: string[];
  /**
   * attendances are tracked by week for Groups
   */
  attendances: AttendanceRequest[];
  /**
   * public-facing ID of the course instance, e.g., 101
   */
  courseId?: string;
  /**
   * Age group of the class instance, e.g. "adult", "youth"
   */
  ageGroup?: AgeGroup;
  /**
   * If true, the course is hidden from public view
   */
  isNonPublic?: boolean;
  notes?: string;
}

export interface GroupTracker extends BGroupTracker, AutoProps {}

export interface GroupTrackerResponse extends Omit<
  GroupTracker,
  "course" | "teacher" | "semester" | "attendances"
> {
  course: Course;
  teacher: Teacher;
  semester: Semester;
  attendances: AttendanceResponse[];
}

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
