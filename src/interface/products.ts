import { z } from "zod";
import { addAutoProps, type AutoProps } from "./addAutoProps";
import { zUser, type User } from "./user";

export interface BProduct {
  name: string;
  price: number;
  notes?: string;
}

export interface Product extends BProduct, AutoProps {}

export interface ProductResponse extends Omit<Product, "editedBy"> {
  editedBy: User;
}

export const zBProduct = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price cannot be negative"),
  notes: z.string().optional(),
});

export const zProduct = addAutoProps(zBProduct);

export const zProductResponse = zProduct.extend({
  editedBy: zUser,
});
