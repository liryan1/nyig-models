import { z } from "zod";
import { TicketStatus } from "./ticketStatus";
import { addAutoProps } from "../addAutoProps";

export const zBReportTicket = z.object({
  requester: z.string(),
  resolver: z.string().optional(),
  status: z.nativeEnum(TicketStatus),
  title: z.string(),
  description: z.string(),
});

export const zReportTicket = addAutoProps(zBReportTicket);

export type BReportTicket = z.infer<typeof zBReportTicket>;
export type ReportTicket = z.infer<typeof zReportTicket>;
