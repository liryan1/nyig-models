import { z } from "zod";
import { zTuition } from "../payment/tuition";
import { AttendState } from "./attendState";
import { CampOption } from "./campOption";
import { addAutoProps } from "../addAutoProps";

export const zBAttendance = z.object({
  student: z.string(),
  states: z.array(z.nativeEnum(AttendState)),
  tuition: zTuition,
  paid: z.boolean().optional(),
  campOption: z.nativeEnum(CampOption),
});

export const zAttendance = addAutoProps(zBAttendance);

export type BAttendance = z.infer<typeof zBAttendance>;
export type Attendance = z.infer<typeof zAttendance>;
