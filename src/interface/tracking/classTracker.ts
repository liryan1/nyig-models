import { z } from "zod";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zCourse, type Course } from "../course";
import { zStudent, zTeacher, type Student, type Teacher } from "../user";
import { zClassTimesInput, type ClassTimesInput } from "./classTimesInput";

export interface BClassTracker {
  course: string;
  teacher: string;
  student: string;
  classTimes: Date[];
  completedList: boolean[];
  /**
   * Virtual mongoose field when all values in completedList is true
   */
  completed?: boolean;
  /**
   * @deprecated This field is no longer used
   */
  paid?: boolean;
  paused?: boolean;
  notes?: string;
}

export interface ClassTracker extends BClassTracker, AutoProps {}

export interface ClassTrackerResponse extends Omit<ClassTracker, "course" | "teacher" | "student"> {
  course: Course;
  teacher: Teacher;
  student: Student;
}

export interface TrackerCreate extends BClassTracker {
  classTimesInput: ClassTimesInput;
}

export const zBClassTracker = z.object({
  course: z.string(),
  teacher: z.string(),
  student: z.string(),
  classTimes: z.array(z.coerce.date()),
  completedList: z.array(z.boolean()),
  /**
   * Virtual mongoose field when all values in completedList is true
   */
  completed: z.boolean().optional(),
  /**
   * @deprecated This field is no longer used
   */
  paid: z.boolean().optional(),
  paused: z.boolean().optional(),
  notes: z.string().optional(),
});

export const zClassTracker = addAutoProps(zBClassTracker);

export const zClassTrackerResponse = zClassTracker.extend({
  course: zCourse,
  teacher: zTeacher,
  student: zStudent,
});

export const zTrackerCreate = zBClassTracker.extend({
  classTimesInput: zClassTimesInput,
});
