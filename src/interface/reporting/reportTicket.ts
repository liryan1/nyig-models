import { z } from "zod";
import { extendZodObjectForMongoose } from "../../mongoose";

enum TicketStatus {
  REQUESTED = "Requested",
  IN_PROGRESS = "In-progress",
  SIGN_OFF = "Sign-off",
  COMPLETED = "Completed",
}

export const zReportTicket = z.object({
  requester: z.string(),
  resolver: z.string(),
  status: z.nativeEnum(TicketStatus),
  title: z.string(),
  description: z.string(),
});

export const zMReportTicket = extendZodObjectForMongoose(zReportTicket);

export type ReportTicket = z.infer<typeof zReportTicket>;
export type MReportTicket = z.infer<typeof zMReportTicket>;
