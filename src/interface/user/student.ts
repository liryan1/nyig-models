import { z } from "zod";
import { GoRank } from "./goRank";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zBUser, type BUser } from "./user";

export interface BStudent extends BUser {
  rank: GoRank;
  guardian?: string;
}

export interface Student extends BStudent, AutoProps {}

export const zBStudent = zBUser.extend({
  rank: z.nativeEnum(GoRank),
  guardian: z.string().optional(),
});
export const zStudent = addAutoProps(zBStudent);
