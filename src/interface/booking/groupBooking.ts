import { z } from "zod";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { type BPaymentInfo, zBPaymentInfo } from "./bPaymentInfo";
import { type BUserInfo, zBUserInfo } from "./bUserInfo";

export interface BGroupBooking extends BUserInfo, BPaymentInfo {
  gtId?: string;
  isTrial?: boolean;
  isOnline: boolean;
  classDate?: string;
  shipping?: boolean;
}

export interface GroupBooking extends BGroupBooking, AutoProps {}

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
