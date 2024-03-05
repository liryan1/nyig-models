import { z } from "zod";

const zTable = z.array(z.record(z.string(), z.string()));

export const zDetailsTable = z.object({
  fields: z.array(z.string()).length(2),
  data: zTable,
});

export const zScheduleTable = z.object({
  fields: z.array(z.string()).length(2),
  data: z.record(z.string(), zTable),
});

export type DetailsTable = z.infer<typeof zDetailsTable>;
export type ScheduleTable = z.infer<typeof zScheduleTable>;
