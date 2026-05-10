import { z } from "zod";
import { HearAboutUs } from "./hearAboutUs";

export interface BUserInfo {
  userId?: string;
  firstName: string;
  lastName: string;
  rank: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  // Optional for backwards compatibility, required field on UI
  hearAboutUs?: HearAboutUs;
  // Additional info such as friend/family referer
  hearAboutUsDetails?: string;
  // show/hide on Aurora event page "who is coming" list
  showOnWhoIsComing?: boolean;
  participateAs?: "adult" | "youth";
  // Required for youth tournaments
  dateOfBirth?: string;
  // Track the selected user profile
  profileId?: string;
}

export const zBUserInfo = z.object({
  userId: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  rank: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  // Optional for backwards compatibility, required field on UI
  hearAboutUs: z.nativeEnum(HearAboutUs).optional(),
  // Additional info such as friend/family referer
  hearAboutUsDetails: z.string().optional(),
  // show/hide on Aurora event page "who is coming" list
  showOnWhoIsComing: z.boolean().optional(),
  participateAs: z.enum(["adult", "youth"]).optional(),
  // Required for youth tournaments
  dateOfBirth: z.string().optional(),
  // Track the selected user profile
  profileId: z.string().optional(),
});
