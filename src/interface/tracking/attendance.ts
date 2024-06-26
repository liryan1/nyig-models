import { z } from "zod";
import { zTuition } from "../payment/tuition";
import { AttendState } from "./attendState";
import { CampOption } from "./campOption";
import { addAutoProps } from "../addAutoProps";
import { zStudent } from "../user";

export const zBAttendance = z.object({
  student: z.string(),
  states: z.array(z.nativeEnum(AttendState)),
  /**
   * @deprecated This field is no longer used
   */
  tuition: zTuition.optional(),
  paid: z.boolean().optional(),
  campOption: z.nativeEnum(CampOption).optional(),
});

export const zAttendance = addAutoProps(zBAttendance);
export const zAttendanceRequest = zAttendance.extend({
  _id: z.string().optional(),
});
export const zAttendanceResponse = zAttendance.extend({
  student: zStudent,
});

export type BAttendance = z.infer<typeof zBAttendance>;
export type Attendance = z.infer<typeof zAttendance>;
export type AttendanceRequest = z.infer<typeof zAttendanceRequest>;
export type AttendanceResponse = z.infer<typeof zAttendanceResponse>;
