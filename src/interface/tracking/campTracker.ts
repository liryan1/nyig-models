import { z } from "zod";
import { addAutoProps } from "../addAutoProps";

export const zBCampTracker = z.object({
  course: z.string(),
  teacher: z.string(),
  semester: z.string(),
  /**
   * occurrences are tracked by week for camps
   */
  occurrences: z.array(z.string()),
  /**
   * attendances are tracked by week for camps
   */
  attendances: z.array(z.string()),
  isNonPublic: z.boolean().optional(),
  notes: z.string().optional(),
});

export const zCampTracker = addAutoProps(zBCampTracker);

export type BCampTracker = z.infer<typeof zBCampTracker>;
export type CampTracker = z.infer<typeof zCampTracker>;
