import { z } from "zod";
import { addAutoProps } from "../addAutoProps";
import { zUser } from "../user";
import { TicketStatus } from "./ticketStatus";

export const zBReportTicket = z.object({
  requester: z.string(),
  resolver: z.string().optional(),
  status: z.nativeEnum(TicketStatus),
  title: z.string(),
  description: z.string(),
});

export const zReportTicket = addAutoProps(zBReportTicket);
export const zReportTicketResponse = zReportTicket.extend({
  requester: zUser,
  resolver: zUser.optional(),
});

export type BReportTicket = z.infer<typeof zBReportTicket>;
export type ReportTicket = z.infer<typeof zReportTicket>;
export type ReportTicketResponse = z.infer<typeof zReportTicketResponse>;
