import { z } from "zod";
import { addAutoProps } from "./addAutoProps";
import { zUser } from "./user";

export const zBProduct = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price cannot be negative"),
  notes: z.string().optional(),
});

export const zProduct = addAutoProps(zBProduct);
export const zProductResponse = zProduct.extend({
  editedBy: zUser,
});

export type BProduct = z.infer<typeof zBProduct>;
export type Product = z.infer<typeof zProduct>;
export type ProductResponse = z.infer<typeof zProductResponse>;
