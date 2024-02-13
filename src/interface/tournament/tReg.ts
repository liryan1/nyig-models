import { z } from "zod";
import { extendZodObjectForMongoose } from "../../mongoose";
import { zTTicketReg } from "./tTicketReg";
import { zBPaymentInfo, zBUserInfo } from "../booking";

export const zTReg = z
  .object({
    agaId: z.string(),
    /**
     * Mongoose ID of the tournament that the participant is registering for
     */
    tournamentId: z.string(),
    tickets: z.array(zTTicketReg),
    /**
     * @units CENTS - Donation in cents
     */
    donation: z.number().optional(),
    /**
     * How the registration was created, namely through public endpoint or admin
     */
    createMethod: z.string().optional(),
    /**
     * Mongoose ID of the admin that edited the registration
     */
    edited: z.string().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zMTReg = extendZodObjectForMongoose(zTReg);

export type TReg = z.infer<typeof zTReg>;
export type MTReg = z.infer<typeof zMTReg>;
