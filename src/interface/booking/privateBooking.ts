import { z } from "zod";
import { zBPaymentInfo } from "./bPaymentInfo";
import { zBUserInfo } from "./bUserInfo";
import { addAutoProps } from "../addAutoProps";

export const zBPrivateBooking = z
  .object({
    courseId: z.string(),
    teacherId: z.string(),
    classDate: z.string().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zPrivateBooking = addAutoProps(zBPrivateBooking);

export type BPrivateBooking = z.infer<typeof zBPrivateBooking>;
export type PrivateBooking = z.infer<typeof zPrivateBooking>;
