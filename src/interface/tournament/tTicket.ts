import { z } from "zod";
import { extendZodObjectForMongoose } from "../../mongoose";

export const zTTicket = z.object({
  name: z.string(),
  /**
   * Price in cents
   */
  price: z.number(),
  /**
   * @optional description of the ticket
   */
  description: z.string().optional(),
  /**
   *  @optional The ticket cannot be purchased if true
   */
  isNotBuyable: z.boolean().optional(),
  /**
   *  @optional If date is provided and in the past, ticket cannot be purchased
   */
  lastBuyableDate: z.coerce.date().optional(),
});

export const zMTTicket = extendZodObjectForMongoose(zTTicket);

export type TTicket = z.infer<typeof zTTicket>;
export type MTTicket = z.infer<typeof zMTTicket>;
