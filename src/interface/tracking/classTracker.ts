import { z } from "zod";
import { addAutoProps } from "../addAutoProps";
import { zCourse } from "../course";
import { zStudent, zTeacher } from "../user";
import { zClassTimesInput } from "./classTimesInput";

export type ClassTimesInput = z.infer<typeof zClassTimesInput>;

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
export type TrackerCreate = z.infer<typeof zTrackerCreate>;

export type BClassTracker = z.infer<typeof zBClassTracker>;
export type ClassTracker = z.infer<typeof zClassTracker>;
export type ClassTrackerResponse = z.infer<typeof zClassTrackerResponse>;
