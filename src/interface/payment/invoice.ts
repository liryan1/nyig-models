import { z } from "zod";
import { PaymentMethod } from "./paymentMethod";
import { extendZodObjectForMongoose } from "../../mongoose";

export const zDiscount = z.object({
  desc: z.string(),
  amount: z.number(),
});

export const zInvoiceItem = z.object({
  /**
   * Mongoose object ID
   */
  course: z.string(),
  price: z.number(),
  units: z.number(),
});

export const zInvoicePackage = z.object({
  /**
   * Mongoose object ID
   */
  student: z.string(),
  items: z.array(zInvoiceItem),
});

export const zInvoice = z.object({
  billTo: z.string(),
  packages: z.array(zInvoicePackage),
  discounts: z.array(zDiscount),
  textbook: z.number().optional(),
  shipping: z.number().optional(),
  paid: z.nativeEnum(PaymentMethod).optional(),
  notes: z.string().optional(),
  /**
   * Mongoose object ID
   */
  createdBy: z.string(),
  /**
   * Mongoose object ID
   */
  lastEditBy: z.string().optional(),
});

export const zMInvoice = extendZodObjectForMongoose(zInvoice);

export type Discount = z.infer<typeof zDiscount>;
export type InvoiceItem = z.infer<typeof zInvoiceItem>;
export type InvoicePackage = z.infer<typeof zInvoicePackage>;
export type Invoice = z.infer<typeof zInvoice>;
export type MInvoice = z.infer<typeof zMInvoice>;
