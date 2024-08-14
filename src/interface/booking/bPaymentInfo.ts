import { z } from "zod";

export const zBPaymentInfo = z.object({
  /**
   * @units CENTS - Proposed payment amount in cents of the booking
   */
  paymentAmount: z.number().int().min(0),
  /**
   * True if the payment has been received. Populated by webhook.
   */
  paymentReceived: z.boolean().optional(),
  /**
   * When Date is reached, document is deleted by MongoDB sweeper.
   * Creation typically marks one to two weeks.
   * After payment, webhook should extend this date to essentially infinite.
   */
  expireAt: z.coerce.date().optional(),
});

export type BPaymentInfo = z.infer<typeof zBPaymentInfo>;
