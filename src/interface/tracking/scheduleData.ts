import { z } from "zod";

export interface ScheduleData {
  startTime: string; // String in 24 hour "HH:mm" format
  dayOfWeek: number; // integeters in 0 - 6
  startDate?: string; // First day of class, optional for backwards compatibility
  numberOfClasses?: number; // optional for backwards compatibility
}

export const zScheduleData = z.object({
  startTime: z.string(), // String in 24 hour "HH:mm" format
  dayOfWeek: z.number().int().min(0).max(6), // integeters in 0 - 6
  startDate: z.string().optional(), // First day of class, optional for backwards compatibility
  numberOfClasses: z.number().int().min(0).optional(), // optional for backwards compatibility
});
