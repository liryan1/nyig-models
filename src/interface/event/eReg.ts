import { z } from "zod";
import { zBPaymentInfo, zBUserInfo } from "../booking";
import { zEventTicketReg, zEventTicketRegResponse } from "./eTicketReg";
import { addAutoProps } from "../addAutoProps";

export const zBEventReg = z
  .object({
    agaId: z.string(),
    tournamentId: z.string(),
    tickets: z.array(zEventTicketReg),
    /**
     * @units CENTS - Donation in cents
     */
    donation: z.coerce.number().optional(),
    /**
     * How the registration was created, through public endpoint or admin
     */
    createMethod: z.string().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zEventReg = addAutoProps(zBEventReg);
export const zEventRegResponse = zEventReg.extend({
  tickets: z.array(zEventTicketRegResponse),
});

export type BEventReg = z.infer<typeof zBEventReg>;
export type EventReg = z.infer<typeof zEventReg>;
export type EventRegResponse = z.infer<typeof zEventRegResponse>;
