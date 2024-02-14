import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";

export const zTeacherPaymentRow = z.object({
  course: z.string(),
  length: z.number(),
  count: z.number(),
  wage: z.number(),
});

export const zTeacherPayment = z.object({
  teacher: z.instanceof(Types.ObjectId).or(z.string()),
  rows: z.array(zTeacherPaymentRow),
  paid: z.boolean().optional(),
});

export const zMTeacherPayment = extendZodObjectForMongoose(zTeacherPayment);

export type TeacherPaymentRow = z.infer<typeof zTeacherPaymentRow>;
export type TeacherPayment = z.infer<typeof zTeacherPayment>;
export type MTeacherPayment = z.infer<typeof zMTeacherPayment>;
