import { z } from "zod";
import { extendZodObjectForMongoose } from "../../mongoose";
import { zBPaymentInfo } from "./bPaymentInfo";
import { zBUserInfo } from "./bUserInfo";

export const zGroupBooking = z
  .object({
    userId: z.string().optional(),
    gtId: z.string().optional(),
    isTrial: z.boolean().optional(),
    isOnline: z.boolean(),
    classDate: z.string().optional(),
    shipping: z.boolean().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zMGroupBooking = extendZodObjectForMongoose(zGroupBooking);

export type GroupBooking = z.infer<typeof zGroupBooking>;
export type MGroupBooking = z.infer<typeof zMGroupBooking>;
