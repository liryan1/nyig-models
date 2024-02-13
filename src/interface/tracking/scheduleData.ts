import { z } from "zod";

export const zScheduleData = z.object({
  startTime: z.string(), // String in 24 hour "HH:mm" format
  dayOfWeek: z.number().int().min(0).max(6), // integeters in 0 - 6
});

export type ScheduleData = z.infer<typeof zScheduleData>;
