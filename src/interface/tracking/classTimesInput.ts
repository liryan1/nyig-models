import { z } from "zod";
import { zDayOfWeek } from "./dayOfWeek";

export const zClassTimesInput = z.object({
  startDate: z.date(),
  freq: z.coerce.number().min(1, "Please select a valid frequency"),
  daysOfWeek: z.array(zDayOfWeek),
  numberOfClasses: z.coerce.number().int().min(1, "Must enroll in at least one class"),
});

export type ClassTimesInput = z.infer<typeof zClassTimesInput>;
