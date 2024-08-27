import { z } from "zod";
import { HearAboutUs } from "./hearAboutUs";

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
});

export type BUserInfo = z.infer<typeof zBUserInfo>;
