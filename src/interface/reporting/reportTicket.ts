import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";
import { TicketStatus } from "./ticketStatus";

export const zReportTicket = z.object({
  requester: z.instanceof(Types.ObjectId).or(z.string()),
  resolver: z.instanceof(Types.ObjectId).or(z.string()).optional(),
  status: z.nativeEnum(TicketStatus),
  title: z.string(),
  description: z.string(),
});

export const zMReportTicket = extendZodObjectForMongoose(zReportTicket);

export type ReportTicket = z.infer<typeof zReportTicket>;
export type MReportTicket = z.infer<typeof zMReportTicket>;
