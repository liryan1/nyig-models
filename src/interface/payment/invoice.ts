import { z } from "zod";
import { PaymentMethod } from "./paymentMethod";
import { addAutoProps } from "../addAutoProps";

export const zDiscount = z.object({
  desc: z.string(),
  amount: z.number(),
});

export const zInvoiceItem = z.object({
  course: z.string().min(1),
  price: z.number(),
  units: z.number(),
});

export const zInvoicePackage = z.object({
  student: z.string(),
  items: z.array(zInvoiceItem).min(1, "Package must contain at least one item"),
});

export const zBInvoice = z.object({
  billTo: z.string().min(1, "The 'Bill To' field must not be empty"),
  packages: z.array(zInvoicePackage).min(1, "Invoice must include at least one package"),
  discounts: z.array(zDiscount),
  textbook: z.number().int().min(0).optional(),
  shipping: z.number().int().min(0).optional(),
  paid: z.nativeEnum(PaymentMethod).optional(),
  notes: z.string().optional(),
  createdBy: z.string(),
});

export const zInvoice = addAutoProps(zBInvoice);

export type Discount = z.infer<typeof zDiscount>;
export type InvoiceItem = z.infer<typeof zInvoiceItem>;
export type InvoicePackage = z.infer<typeof zInvoicePackage>;
export type BInvoice = z.infer<typeof zBInvoice>;
export type Invoice = z.infer<typeof zInvoice>;
