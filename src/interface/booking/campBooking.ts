import { z } from "zod";
import { CampOption } from "../tracking";
import { zBPaymentInfo } from "./bPaymentInfo";
import { zBUserInfo } from "./bUserInfo";
import { addAutoProps } from "../addAutoProps";

export const zBCampBooking = z
  .object({
    ctId: z.string().optional(),
    isOnline: z.boolean(),
    classDates: z.string(),
    campOption: z.nativeEnum(CampOption),
    shipping: z.boolean().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zCampBooking = addAutoProps(zBCampBooking);

export type BCampBooking = z.infer<typeof zBCampBooking>;
export type CampBooking = z.infer<typeof zCampBooking>;
