import { z } from "zod";
import { PaymentMethod } from "./paymentMethod";
import { addAutoProps } from "../addAutoProps";
import { zStudent, zTeacher } from "../user";

export const zDiscount = z.object({
  desc: z.string().min(1, "Discount description cannot be empty"),
  amount: z.coerce.number(),
});

export const zInvoiceItem = z.object({
  course: z.string().min(1, "Course description cannot be empty"),
  price: z.coerce.number(),
  units: z.coerce.number(),
});

export const zInvoicePackage = z.object({
  student: z.string(),
  items: z.array(zInvoiceItem).min(1, "Package must contain at least one item"),
});

export const zInvoicePackageResponse = zInvoicePackage.extend({
  student: zStudent,
});

export const zBInvoice = z.object({
  billTo: z.string().min(1, "The 'Bill To' field must not be empty"),
  packages: z.array(zInvoicePackage).min(1, "Invoice must include at least one package"),
  discounts: z.array(zDiscount),
  textbook: z.coerce.number().int().min(0).optional(),
  shipping: z.coerce.number().int().min(0).optional(),
  paid: z.nativeEnum(PaymentMethod).optional(),
  showEin: z.boolean().optional(),
  notes: z.string().or(z.literal("")).optional(),
  createdBy: z.string(),
  lastEditBy: z.string().optional(),
});

export const zInvoice = addAutoProps(zBInvoice);
export const zInvoiceResponse = zInvoice.extend({
  createdBy: zTeacher,
  lastEditBy: zTeacher.optional(),
  packages: z.array(zInvoicePackageResponse),
});

export type Discount = z.infer<typeof zDiscount>;
export type InvoiceItem = z.infer<typeof zInvoiceItem>;
export type InvoicePackage = z.infer<typeof zInvoicePackage>;
export type InvoicePackageResponse = z.infer<typeof zInvoicePackageResponse>;
export type BInvoice = z.infer<typeof zBInvoice>;
export type Invoice = z.infer<typeof zInvoice>;
export type InvoiceResponse = z.infer<typeof zInvoiceResponse>;
