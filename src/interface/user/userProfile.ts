import { z } from "zod";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { GoRank } from "./goRank";

export interface BUserProfile {
  firstName: string;
  lastName: string;
  rank?: GoRank;
  agaId: string;
  address?: string | "";
  participateAs?: "adult" | "youth" | "";
  showOnWhoIsComing?: boolean;
  preferredEmail?: string | "";
  phoneNumber?: string | "";
  birthDate?: string | "";
}

export interface UserProfile extends BUserProfile, AutoProps {}

export const zBUserProfile = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  rank: z.nativeEnum(GoRank).optional(),
  agaId: z.string().regex(/^\d{4,5}$/, {
    message: `Please enter a valid AGA ID`,
  }),
  address: z.string().or(z.literal("")).optional(),
  participateAs: z.enum(["adult", "youth"]).or(z.literal("")).optional(),
  showOnWhoIsComing: z.boolean().optional(),
  preferredEmail: z.string().email().or(z.literal("")).optional(),
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
});
export const zUserProfile = addAutoProps(zBUserProfile);
