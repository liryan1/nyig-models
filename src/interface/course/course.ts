import { z } from "zod";
import { CourseCategory } from "./category";
import { NYIGSchool } from "./school";
import { extendZodObjectForMongoose } from "../mongoose";

export const zCourse = z.object({
  name: z.string(),
  category: z.nativeEnum(CourseCategory),
  /**
   * @unit SECONDS - Duration of the course in seconds
   */
  duration: z.number(),
  /**
   * @unit CENTS - Price of the course in cents
   */
  price: z.number(),
  description: z.string().optional(),
  /**
   * NYIG School locations
   */
  nyigSchool: z.nativeEnum(NYIGSchool),
  /**
   * Recommended level before taking this course
   */
  recLevel: z.string(),
  /**
   * Camp tuition for half-day option
   */
  halfCampTuition: z.number(),
  /**
   * Camp tuition for full-day option
   */
  fullCampTuition: z.number(),
});
export const zMCourse = extendZodObjectForMongoose(zCourse);

export type Course = z.infer<typeof zCourse>;
export type MCourse = z.infer<typeof zMCourse>;
