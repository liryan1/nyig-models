import { z } from "zod";
import { addAutoProps } from "../addAutoProps";

export const zTeacherPaymentRow = z.object({
  course: z.string(),
  length: z.number(),
  count: z.number(),
  wage: z.number(),
});

export const zBTeacherPayment = z.object({
  teacher: z.string(),
  rows: z.array(zTeacherPaymentRow),
  paid: z.boolean().optional(),
});

export const zTeacherPayment = addAutoProps(zBTeacherPayment);

export type TeacherPaymentRow = z.infer<typeof zTeacherPaymentRow>;
export type BTeacherPayment = z.infer<typeof zBTeacherPayment>;
export type TeacherPayment = z.infer<typeof zTeacherPayment>;
