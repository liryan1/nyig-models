import { z } from "zod";
import { PaymentMethod } from "./paymentMethod";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zStudent, zTeacher, type Student, type Teacher } from "../user";

export interface Discount {
  desc: string;
  amount: number;
}

export interface InvoiceItem {
  course: string;
  price: number;
  units: number;
}

export interface InvoicePackage {
  student: string;
  items: InvoiceItem[];
}

export interface InvoicePackageResponse extends Omit<InvoicePackage, "student"> {
  student: Student;
}

export interface BInvoice {
  billTo: string;
  packages: InvoicePackage[];
  discounts: Discount[];
  textbook?: number;
  shipping?: number;
  paid?: PaymentMethod;
  paidAt?: string;
  showEin?: boolean;
  notes?: string | "";
  feeLabel?: string;
  createdBy: string;
}

export interface Invoice extends BInvoice, AutoProps {}

export interface InvoiceResponse extends Omit<Invoice, "packages" | "createdBy" | "editedBy"> {
  createdBy: Teacher;
  editedBy?: Teacher;
  packages: InvoicePackageResponse[];
}

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
  paidAt: z.string().optional(),
  showEin: z.boolean().optional(),
  notes: z.string().or(z.literal("")).optional(),
  feeLabel: z.string().optional(),
  createdBy: z.string(),
});

export const zInvoice = addAutoProps(zBInvoice);

export const zInvoiceResponse = zInvoice.extend({
  createdBy: zTeacher,
  editedBy: zTeacher.optional(),
  packages: z.array(zInvoicePackageResponse),
});
