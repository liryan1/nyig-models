import { z } from "zod";
import { GoRank } from "./goRank";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zBUser, type BUser } from "./user";
import { NYIGSchool } from "../course";

export interface BTeacher extends BUser {
  rank: GoRank;
  /**
   * Inactive teachers are not shown on public endpoints
   */
  isInactive?: boolean;
  /**
   * If true, teacher is never available for booking
   */
  doesNotTeachPrivateLessons?: boolean;
  /**
   * Teacher's position, e.g., instructor, president
   */
  title?: string;
  /**
   * Teacher's bio text describing experience
   * new lines will be rendered as paragraphs
   */
  bio?: string;
  /**
   * Permanent URL of the image
   */
  imageUrl?: string;
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
  available?: number[][][];
  /**
   * Schools the teacher is affiliated with
   * Required for showing on the aurora "about" page
   */
  schools: NYIGSchool[];
}

export interface Teacher extends BTeacher, AutoProps {}

export interface TeacherResponse extends Omit<
  Teacher,
  "roles" | "editedBy" | "updatedAt" | "createdAt"
> {
  role: number;
}

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

export const zTeacherResponse = zTeacher
  .omit({ roles: true, editedBy: true, updatedAt: true, createdAt: true })
  .extend({
    role: z.number().int(),
  });
