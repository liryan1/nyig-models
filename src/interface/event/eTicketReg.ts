import { z } from "zod";
import { zEventTicket, type EventTicket } from "./eTicket";

export interface EventTicketReg {
  ticket: string;
  /**
   * integer minimum 1, otherwise no ticket is being bought
   */
  amount: number;
}

export interface EventTicketRegResponse extends Omit<EventTicketReg, "ticket"> {
  ticket: EventTicket;
}

export const zEventTicketReg = z.object({
  ticket: z.string(),
  /**
   * integer minimum 1, otherwise no ticket is being bought
   */
  amount: z.number().int().min(1),
});

export const zEventTicketRegResponse = zEventTicketReg.extend({
  ticket: zEventTicket,
});
