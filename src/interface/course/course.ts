import { z } from "zod";
import { CourseCategory } from "./category";
import { NYIGSchool } from "./school";
import { addAutoProps } from "../addAutoProps";

export const zBCourse = z.object({
  name: z.string(),
  category: z.nativeEnum(CourseCategory),
  /**
   * @unit SECONDS - Duration of the course in seconds
   */
  duration: z.coerce
    .number()
    .int("Duration in seconds must be a whole number")
    .min(1, "Duration in seconds must not be less than or equal to 0"),
  /**
   * @unit CENTS - Price of the course in cents
   */
  price: z.coerce
    .number()
    .int("Tuition must be a whole number in cents")
    .min(1, "Tuition must not be less than or equal to 0"),
  description: z.string().or(z.literal("")).optional(),
  /**
   * NYIG School location
   * @deprecated
   */
  nyigSchool: z.nativeEnum(NYIGSchool).optional(),
  /**
   * NYIG School locations the course is offered at
   */
  schools: z.array(z.nativeEnum(NYIGSchool)).optional(),
  /**
   * Recommended level before taking this course
   */
  recLevel: z.string().or(z.literal("")).optional(),
  /**
   * Camp tuition for half-day option
   */
  halfCampTuition: z.coerce
    .number()
    .int("Tuition must be a whole number in cents")
    .min(1, "Tuition must not be less than or equal to 0")
    .optional(),
  /**
   * Camp tuition for full-day option
   */
  fullCampTuition: z.coerce
    .number()
    .int("Tuition must be a whole number in cents")
    .min(1, "Tuition must not be less than or equal to 0")
    .optional(),

  superadminOnly: z.boolean().optional(),
});
export const zCourse = addAutoProps(zBCourse);

export type BCourse = z.infer<typeof zBCourse>;
export type Course = z.infer<typeof zCourse>;
