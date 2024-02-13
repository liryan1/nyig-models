import { z } from "zod";
import { Season } from "./season";
import { extendZodObjectForMongoose } from "../mongoose";

export const zSemester = z.object({
  season: z.nativeEnum(Season),
  year: z.number().min(2022).max(2999),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  /**
   * Format: start, end, start, end, ...
   */
  blackoutDates: z.array(z.coerce.date()),
  /**
   * List of names of some break: date range
   */
  importantDates: z.array(z.string()),
});

export const zMSemester = extendZodObjectForMongoose(zSemester);

export type Semester = z.infer<typeof zSemester>;
export type MSemester = z.infer<typeof zMSemester>;
