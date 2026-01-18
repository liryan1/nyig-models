import { z } from "zod";
import { addAutoProps } from "./addAutoProps";

export const zBProduct = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price cannot be negative"),
  notes: z.string().optional(),
});

const zProduct = addAutoProps(zBProduct);

export type BProduct = z.infer<typeof zBProduct>;
export type Product = z.infer<typeof zProduct>;
