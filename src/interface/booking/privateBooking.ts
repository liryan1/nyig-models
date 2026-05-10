import { z } from "zod";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { type BPaymentInfo, zBPaymentInfo } from "./bPaymentInfo";
import { type BUserInfo, zBUserInfo } from "./bUserInfo";

export interface BPrivateBooking extends BUserInfo, BPaymentInfo {
  courseId: string;
  teacherId: string;
  classDate?: string;
}

export interface PrivateBooking extends BPrivateBooking, AutoProps {}

export const zBPrivateBooking = z
  .object({
    courseId: z.string(),
    teacherId: z.string(),
    classDate: z.string().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zPrivateBooking = addAutoProps(zBPrivateBooking);
