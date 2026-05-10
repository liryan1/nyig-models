import { z } from "zod";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zUser, type User } from "../user";
import { TicketStatus } from "./ticketStatus";

export interface BReportTicket {
  requester: string;
  resolver?: string;
  status: TicketStatus;
  title: string;
  description: string;
}

export interface ReportTicket extends BReportTicket, AutoProps {}

export interface ReportTicketResponse extends Omit<ReportTicket, "requester" | "resolver"> {
  requester: User;
  resolver?: User;
}

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
