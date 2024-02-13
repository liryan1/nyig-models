import { z } from "zod";

export const zTTicketReg = z.object({
  /**
   * Mongoose ID of the ticket
   */
  ticket: z.string(),
  /**
   * integer minimum 1, otherwise no ticket is being bought
   */
  amount: z.number().int().min(1),
});

export type TTicketReg = z.infer<typeof zTTicketReg>;
