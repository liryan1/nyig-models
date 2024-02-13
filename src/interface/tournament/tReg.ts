import { Types } from "mongoose";
import { z } from "zod";
import { zBPaymentInfo, zBUserInfo } from "../booking";
import { extendZodObjectForMongoose } from "../mongoose";
import { zTTicketReg } from "./tTicketReg";

export const zTReg = z
  .object({
    agaId: z.string(),
    tournamentId: z.instanceof(Types.ObjectId),
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
    edited: z.instanceof(Types.ObjectId).optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zMTReg = extendZodObjectForMongoose(zTReg);

export type TReg = z.infer<typeof zTReg>;
export type MTReg = z.infer<typeof zMTReg>;
