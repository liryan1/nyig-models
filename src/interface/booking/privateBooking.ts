import { z } from "zod";
import { extendZodObjectForMongoose } from "../../mongoose";
import { zBPaymentInfo } from "./bPaymentInfo";
import { zBUserInfo } from "./bUserInfo";

export const zPrivateBooking = z
  .object({
    userId: z.string().optional(),
    courseId: z.string(),
    teacherId: z.string(),
    classDate: z.string().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zMPrivateBooking = extendZodObjectForMongoose(zPrivateBooking);

export type BPrivate = z.infer<typeof zPrivateBooking>;
export type MBPrivate = z.infer<typeof zMPrivateBooking>;
