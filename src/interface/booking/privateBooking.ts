import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";
import { zBPaymentInfo } from "./bPaymentInfo";
import { zBUserInfo } from "./bUserInfo";

export const zPrivateBooking = z
  .object({
    courseId: z.instanceof(Types.ObjectId),
    teacherId: z.instanceof(Types.ObjectId),
    classDate: z.string().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zMPrivateBooking = extendZodObjectForMongoose(zPrivateBooking);

export type PrivateBooking = z.infer<typeof zPrivateBooking>;
export type MPrivateBooking = z.infer<typeof zMPrivateBooking>;
