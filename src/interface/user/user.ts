import { z } from "zod";
import { GoRank } from "./goRank";
import { addAutoProps } from "../addAutoProps";

export const zBUser = z.object({
  name: z.string().min(2).max(100),
  username: z.string().optional(),
  password: z.string().optional(),
  roles: z.array(z.number().int()).optional(),
  email: z.string().email().max(100).optional(),
  address: z.string().optional(),
  country: z
    .string()
    .length(2, {
      message: "Enter the 2-letter country code",
    })
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}/, {
      message: `Please enter a valid 10-digit US phone number with numbers only`,
    })
    .optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, {
      message: "Enter a valid date in yyyy-mm-dd format",
    })
    .optional(),
});
export const zUser = addAutoProps(zBUser);

export const zStudent = zUser.extend({
  rank: z.nativeEnum(GoRank),
  guardian: z.string().optional(),
});

export const zTeacher = zUser.extend({
  rank: z.nativeEnum(GoRank),
  /**
   * Inactive teachers are not shown on public endpoints
   */
  isInactive: z.boolean().optional(),
  /**
   * Teacher's position, e.g., instructor, president
   */
  title: z.string().optional(),
  /**
   * Teacher's bio text describing experience
   * new lines will be rendered as paragraphs
   */
  bio: z.string().optional(),
  /** Format is illustrated below, where teacher is available
   * Mon 9-12am 3-6pm & Tue 10-12am 6-10pm
   * [
   *  [[9, 12], [15, 18]],
   *  [[10, 12], [18, 20]],
   *  [],
   *  [],
   *  [],
   *  [],
   *  [],
   * ]
   */
  available: z.array(z.array(z.array(z.number()))).optional(),
});

export type BUser = z.infer<typeof zBUser>;
export type User = z.infer<typeof zUser>;
export type Student = z.infer<typeof zStudent>;
export type Teacher = z.infer<typeof zTeacher>;
