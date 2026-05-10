import { z } from "zod";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zUserRoles, type UserRoles } from "./roles";
import { zUserProfile, type UserProfile } from "./userProfile";

export interface BUser {
  name: string;
  roles?: UserRoles;
  email?: string | "";
  address?: string | "";
  country?: string | "";
  phoneNumber?: string | "";
  birthDate?: string | "";
  /**
   * For prompting the user to change their password on first login
   */
  shouldChangePassword?: boolean;
  /**
   * UserProfile Object storing user preferences
   */
  profiles?: UserProfile[];
}

export interface User extends BUser, AutoProps {}

export const zBUser = z.object({
  name: z.string().min(2).max(100),
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
   * UserProfile Object storing user preferences
   */
  profiles: z.array(zUserProfile).optional(),
});
export const zUser = addAutoProps(zBUser);
