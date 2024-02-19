import { z } from "zod";
import { addAutoProps } from "../addAutoProps";

export const zBEventTicket = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  /**
   * Price in cents
   */
  price: z.number().min(1, "Price must be at least $1"),
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
export const zEventTicket = addAutoProps(zBEventTicket);

export type BEventTicket = z.infer<typeof zBEventTicket>;
export type EventTicket = z.infer<typeof zEventTicket>;
