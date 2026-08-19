import { z } from "zod";
import { BookingType } from "./bookingType";

export const zClassRegistrationResponse = z.object({
  _id: z.string(),
  type: z.nativeEnum(BookingType),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  courseName: z.string(),
  school: z.string(),
  amountPaid: z.number().optional(),
  paymentReceived: z.boolean(),
  expireAt: z.string().optional(),
  createdAt: z.string().optional(),
  isTrial: z.boolean().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  dateOfBirth: z.string().optional(),
  hearAboutUs: z.string().optional(),
  isOnline: z.boolean().optional(),
  classDate: z.string().optional(),
  classDates: z.string().optional(),
  campOption: z.string().optional(),
  shipping: z.boolean().optional(),
});

export type ClassRegistrationResponse = z.infer<typeof zClassRegistrationResponse>;

export const zClassRegistrationCreateRequest = zClassRegistrationResponse.omit({
  _id: true,
  createdAt: true,
});
export type ClassRegistrationCreateRequest = z.infer<typeof zClassRegistrationCreateRequest>;

export const zClassRegistrationUpdateRequest = zClassRegistrationCreateRequest.partial();
export type ClassRegistrationUpdateRequest = z.infer<typeof zClassRegistrationUpdateRequest>;
