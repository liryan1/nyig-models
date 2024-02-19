import { z } from "zod";
import { zBPaymentInfo } from "./bPaymentInfo";
import { zBUserInfo } from "./bUserInfo";
import { addAutoProps } from "../addAutoProps";

export const zBGroupBooking = z
  .object({
    gtId: z.string().optional(),
    isTrial: z.boolean().optional(),
    isOnline: z.boolean(),
    classDate: z.string().optional(),
    shipping: z.boolean().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zGroupBooking = addAutoProps(zBGroupBooking);

export type BGroupBooking = z.infer<typeof zBGroupBooking>;
export type GroupBooking = z.infer<typeof zGroupBooking>;
