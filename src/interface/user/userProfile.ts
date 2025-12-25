import { z } from "zod";
import { addAutoProps } from "../addAutoProps";
import { GoRank } from "./goRank";

export const zBUserProfile = z.object({
  firstName: z.string().min(2).max(50).or(z.literal("")).optional(),
  lastName: z.string().min(2).max(50).or(z.literal("")).optional(),
  address: z.string().or(z.literal("")).optional(),
  rank: z.enum(GoRank).optional(),
  agaId: z
    .string()
    .regex(/^\d{4,5}$/, {
      message: `Please enter a valid AGA ID`,
    })
    .or(z.literal(""))
    .optional(),
  participateAs: z.enum(["adult", "youth"]).optional(),
  showOnWhoIsComing: z.boolean().optional(),
  preferredEmail: z.email().optional(),
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

export type UserProfile = z.infer<typeof zUserProfile>;
