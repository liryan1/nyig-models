import { z } from "zod";
import { GoRank } from "./goRank";
import { addAutoProps } from "../addAutoProps";
import { zBUser } from "./user";

export const zBStudent = zBUser.extend({
  rank: z.nativeEnum(GoRank),
  guardian: z.string().optional(),
});
export const zStudent = addAutoProps(zBStudent);

export type BStudent = z.infer<typeof zBStudent>;
export type Student = z.infer<typeof zStudent>;
