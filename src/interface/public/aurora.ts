import { z } from "zod";
import { NYIGSchool } from "../course/school";
import { AgeGroup } from "../course/ageGroup";

export const zTeacherDisplay = z.object({
  name: z.string(),
  email: z.string().email(),
  title: z.string(),
  imageUrl: z.string(),
  bio: z.string(),
});

export const zCourseTable = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.number(),
  dateAndTime: z.string(),
  recommendedLevel: z.string(),
  tuition: z.string(),
});

export type CourseTable = z.infer<typeof zCourseTable>;

export type TeacherDisplay = z.infer<typeof zTeacherDisplay>;
export interface MNYIGMission extends NYIGMission {
  _id: string;
}

export type AuroraCourses = {
  [school in NYIGSchool]: {
    [ageGroup in AgeGroup]: CourseTable[];
  };
};

export interface NYIGMission {
  _id?: string;
  /**
   * @index @unique version of the mission
   * "current" is the current mission.
   * Previous mission versions need to be changed to the last effective date
   * e.g., "2022-10-01"
   */
  version: string;
  main1: string;
  main2: string;
  mission: string;
}
