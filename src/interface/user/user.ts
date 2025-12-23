import { z } from "zod";
import { addAutoProps } from "../addAutoProps";
import { zUserRoles } from "./roles";

export const zBUser = z.object({
  name: z.string().min(2).max(100),
  username: z.string().optional(),
  password: z.string().optional(),
  roles: zUserRoles.optional(),
  email: z.string().max(100).email().or(z.literal("")).optional(),
  address: z.string().or(z.literal("")).optional(),
  country: z
    .string()
    .length(2, {
      message: "Enter the 2-letter country code",
    })
    .or(z.literal(""))
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}/, {
      message: `Please enter a valid 10-digit US phone number with numbers only`,
    })
    .or(z.literal(""))
    .optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, {
      message: "Enter a valid date in yyyy-mm-dd format",
    })
    .or(z.literal(""))
    .optional(),
  /**
   * For prompting the user to change their password on first login
   */
  shouldChangePassword: z.boolean().optional(),
  /**
   * Object storing user preferences
   */
  info: z.string().optional(),
});
export const zUser = addAutoProps(zBUser);

export type BUser = z.infer<typeof zBUser>;
export type User = z.infer<typeof zUser>;
