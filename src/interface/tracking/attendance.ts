import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";
import { zTuition } from "../payment/tuition";
import { AttendState } from "./attendState";
import { CampOption } from "./campOption";

export const zAttendance = z.object({
  student: z.instanceof(Types.ObjectId).or(z.string()),
  states: z.array(z.nativeEnum(AttendState)),
  tuition: zTuition,
  paid: z.boolean().optional(),
  campOption: z.nativeEnum(CampOption),
});

export const zMAttendance = extendZodObjectForMongoose(zAttendance);

export type Attendance = z.infer<typeof zAttendance>;
export type MAttendance = z.infer<typeof zMAttendance>;
