import { z } from "zod";
import { addAutoProps } from "../addAutoProps";

export const zTeacherPaymentRow = z.object({
  course: z.string().min(1, "select or enter a course"),
  length: z.coerce.number().gt(0, "must be > 0"),
  count: z.coerce.number().int().gt(0, "must be > 0"),
  wage: z.coerce.number().gt(0, "wage must be > 0"),
});

export const zBTeacherPayment = z.object({
  teacher: z.string().min(1, "select or enter a teacher"),
  rows: z.array(zTeacherPaymentRow),
  paid: z.boolean().optional(),
  /**
   * paymentNotes differentiates from notes as it is displayed on the rendered PDF
   */
  paymentNotes: z.string().optional(),
});

export const zTeacherPayment = addAutoProps(zBTeacherPayment);

export const zTeacherPaymentResponse = zTeacherPayment.extend({
  teacher: z.object({ _id: z.string(), name: z.string(), rank: z.string().optional() }),
  editedBy: z.object({ _id: z.string(), name: z.string(), rank: z.string().optional() }),
});

export type TeacherPaymentRow = z.infer<typeof zTeacherPaymentRow>;
export type BTeacherPayment = z.infer<typeof zBTeacherPayment>;
export type TeacherPayment = z.infer<typeof zTeacherPayment>;
export type TeacherPaymentResponse = z.infer<typeof zTeacherPaymentResponse>;
