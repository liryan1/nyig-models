import { z } from "zod";
import { GoRank } from "./goRank";
import { addAutoProps } from "../addAutoProps";
import { zBUser } from "./user";
import { NYIGSchool } from "../course";

export const zBTeacher = zBUser.extend({
  rank: z.nativeEnum(GoRank),
  /**
   * Inactive teachers are not shown on public endpoints
   */
  isInactive: z.boolean().optional(),
  /**
   * If true, teacher is never available for booking
   */
  doesNotTeachPrivateLessons: z.boolean().optional(),
  /**
   * Teacher's position, e.g., instructor, president
   */
  title: z.string().optional(),
  /**
   * Teacher's bio text describing experience
   * new lines will be rendered as paragraphs
   */
  bio: z.string().optional(),
  /**
   * Permanent URL of the image
   */
  imageUrl: z.string().optional(),
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
  /**
   * Schools the teacher is affiliated with
   * Required for showing on the aurora "about" page
   */
  schools: z
    .array(z.nativeEnum(NYIGSchool))
    .min(1, "Teachers must be affiliated with at least one school"),
});
export const zTeacher = addAutoProps(zBTeacher);

const zTeacherResponse = zTeacher
  .omit({ roles: true, editedBy: true, updatedAt: true, createdAt: true })
  .extend({
    role: z.number().int(),
  });

export type BTeacher = z.infer<typeof zBTeacher>;
export type Teacher = z.infer<typeof zTeacher>;
export type TeacherResponse = z.infer<typeof zTeacherResponse>;
