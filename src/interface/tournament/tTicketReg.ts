import { z } from "zod";
import { Types } from "mongoose";

export const zTTicketReg = z.object({
  ticket: z.instanceof(Types.ObjectId).or(z.string()),
  /**
   * integer minimum 1, otherwise no ticket is being bought
   */
  amount: z.number().int().min(1),
});

export type TTicketReg = z.infer<typeof zTTicketReg>;
