import { z } from "zod";
import { zTuition } from "../payment/tuition";
import { CampOption } from "./campOption";
import { extendZodObjectForMongoose } from "../../mongoose";
import { AttendState } from "./attendState";

export const zAttendance = z.object({
  student: z.string(),
  states: z.array(z.nativeEnum(AttendState)),
  tuition: zTuition,
  paid: z.boolean().optional(),
  campOption: z.nativeEnum(CampOption),
});

export const zMAttendance = extendZodObjectForMongoose(zAttendance);

export type Attendance = z.infer<typeof zAttendance>;
export type MAttendance = z.infer<typeof zMAttendance>;
