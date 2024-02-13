import { z } from "zod";
import { zUserRoles } from "./userRoles";
import { GoRank } from "./goRank";
import { extendZodObjectForMongoose } from "../../mongoose";

export const zUser = z.object({
  name: z.string().min(2).max(100),
  username: z.string().optional(),
  password: z.string().optional(),
  roles: zUserRoles.optional(),
  email: z.string().email().max(100).optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  phoneNumber: z.string().optional(),
  birthDate: z.string().optional(),
});
export const zMUser = extendZodObjectForMongoose(zUser);

export const zStudent = zUser.extend({
  rank: z.nativeEnum(GoRank),
  // Object ID in mongoose linked to a user
  guardian: z.string().optional(),
});
export const zMStudent = extendZodObjectForMongoose(zStudent);

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
export const zMTeacher = extendZodObjectForMongoose(zTeacher);

export type Student = z.infer<typeof zStudent>;
export type MStudent = z.infer<typeof zMStudent>;
export type User = z.infer<typeof zUser>;
export type MUser = z.infer<typeof zMUser>;
export type Teacher = z.infer<typeof zTeacher>;
export type MTeacher = z.infer<typeof zMTeacher>;
