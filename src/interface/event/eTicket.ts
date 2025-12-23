import { z } from "zod";
import { addAutoProps } from "../addAutoProps";

export const zBEventTicket = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  /**
   * Price in cents
   */
  price: z.coerce.number().min(0, "Price must not be negative"),
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
  /**
   *  @optional max limit is 1 unless maxPerOrder is specified
   */
  maxPerOrder: z.coerce.number().int().optional(),
});
export const zEventTicket = addAutoProps(zBEventTicket);

export type BEventTicket = z.infer<typeof zBEventTicket>;
export type EventTicket = z.infer<typeof zEventTicket>;
