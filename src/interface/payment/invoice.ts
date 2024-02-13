import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";
import { PaymentMethod } from "./paymentMethod";

export const zDiscount = z.object({
  desc: z.string(),
  amount: z.number(),
});

export const zInvoiceItem = z.object({
  course: z.instanceof(Types.ObjectId),
  price: z.number(),
  units: z.number(),
});

export const zInvoicePackage = z.object({
  student: z.instanceof(Types.ObjectId),
  items: z.array(zInvoiceItem),
});

export const zInvoice = z.object({
  billTo: z.string(),
  packages: z.array(zInvoicePackage),
  discounts: z.array(zDiscount),
  textbook: z.number().int().min(1).optional(),
  shipping: z.number().int().min(1).optional(),
  paid: z.nativeEnum(PaymentMethod).optional(),
  notes: z.string().optional(),
  createdBy: z.instanceof(Types.ObjectId),
  lastEditBy: z.instanceof(Types.ObjectId).optional(),
});

export const zMInvoice = extendZodObjectForMongoose(zInvoice);

export type Discount = z.infer<typeof zDiscount>;
export type InvoiceItem = z.infer<typeof zInvoiceItem>;
export type InvoicePackage = z.infer<typeof zInvoicePackage>;
export type Invoice = z.infer<typeof zInvoice>;
export type MInvoice = z.infer<typeof zMInvoice>;
