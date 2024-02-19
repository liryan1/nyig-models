import { z } from "zod";
import { zTuition } from "../payment";
import { addAutoProps } from "../addAutoProps";

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
  tuition: zTuition.optional(),
  paid: z.boolean().optional(),
  paused: z.boolean().optional(),
  notes: z.string().optional(),
});

export const zClassTracker = addAutoProps(zBClassTracker);

export type BClassTracker = z.infer<typeof zBClassTracker>;
export type ClassTracker = z.infer<typeof zClassTracker>;
