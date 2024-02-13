import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";
import { CampOption } from "../tracking";
import { zBPaymentInfo } from "./bPaymentInfo";
import { zBUserInfo } from "./bUserInfo";

export const zCampBooking = z
  .object({
    ctId: z.string().optional(),
    isOnline: z.boolean(),
    classDates: z.string(),
    campOption: z.nativeEnum(CampOption),
    shipping: z.boolean().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zMCampBooking = extendZodObjectForMongoose(zCampBooking);

export type CampBooking = z.infer<typeof zCampBooking>;
export type MCampBooking = z.infer<typeof zMCampBooking>;
