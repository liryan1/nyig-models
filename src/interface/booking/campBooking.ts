import { z } from "zod";
import { CampOption } from "../tracking";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { type BPaymentInfo, zBPaymentInfo } from "./bPaymentInfo";
import { type BUserInfo, zBUserInfo } from "./bUserInfo";

export interface BCampBooking extends BUserInfo, BPaymentInfo {
  ctId?: string;
  isOnline: boolean;
  classDates: string;
  campOption: CampOption;
  shipping?: boolean;
}

export interface CampBooking extends BCampBooking, AutoProps {}

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
