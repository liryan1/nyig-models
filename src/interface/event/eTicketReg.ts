import { z } from "zod";
import { zEventTicket } from "./eTicket";

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

export type EventTicketRegResponse = z.infer<typeof zEventTicketRegResponse>;
export type EventTicketReg = z.infer<typeof zEventTicketReg>;
