import { Types } from "mongoose";
import { z } from "zod";
import { extendZodObjectForMongoose } from "../mongoose";
import { zImageDef } from "../public";
import { zDetailsTable, zScheduleTable } from "./table";

export const zTConfig = z.object({
  /**
   * Location of the event
   */
  location: z.string().optional(),
  /**
   * URL of the tournament on the official website
   * Must be a valid URL link
   */
  url: z.string(),
  /**
   * Full name of the tournament
   */
  title: z.string(),
  /**
   * Abbreviated title of the tournament
   */
  shortTitle: z.string(),
  /**
   * Tournament start date and time
   */
  tStart: z.coerce.date(),
  /**
   * Tournament end date and time
   */
  tEnd: z.coerce.date(),
  /**
   * Short description for tournament card
   */
  shortDescription: z.string(),
  /**
   * Full description
   */
  description: z.string(),
  /**
   * Defines the tournament details table with 2 columns
   * typically Time and Event
   */
  details: zDetailsTable,
  /**
   * Defines the tournament schedule.
   * data is a map of tab title -> 2 column table rows.
   */
  schedule: zScheduleTable,
  /**
   * List of ticket object IDs for this tournament
   */
  tickets: z.array(z.instanceof(Types.ObjectId)),
  /**
   * If false, the tournament registration is closed
   */
  canRegister: z.boolean(),
  /**
   * If true, free form donation amounts are disabled.
   */
  donationsDisabled: z.boolean().optional(),
  /**
   * Defines URL, height, width of the image
   */
  image: zImageDef.optional(),
});

export const zMTConfig = extendZodObjectForMongoose(zTConfig);

export type TConfig = z.infer<typeof zTConfig>;
export type MTConfig = z.infer<typeof zMTConfig>;
