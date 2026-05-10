import { z } from "zod";
import { zTuition, type Tuition } from "../payment/tuition";
import { AttendState } from "./attendState";
import { CampOption } from "./campOption";
import { addAutoProps, type AutoProps } from "../addAutoProps";
import { zStudent, type Student } from "../user";

export interface BAttendance {
  student: string;
  states: AttendState[];
  /**
   * @deprecated This field is no longer used
   */
  tuition?: Tuition;
  paid?: boolean;
  campOption?: CampOption;
}

export interface Attendance extends BAttendance, AutoProps {}

export interface AttendanceRequest extends Omit<Attendance, "_id"> {
  _id?: string;
}

export interface AttendanceResponse extends Omit<Attendance, "student"> {
  student: Student;
}

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
