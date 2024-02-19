import { z } from "zod";
import { zImageDef } from "../public";
import { zEventTicket } from "./eTicket";
import { zDetailsTable, zScheduleTable } from "./table";
import { addAutoProps } from "../addAutoProps";

export const zBEventConfig = z.object({
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
  tickets: z.array(z.string()),
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

export const zEventConfig = addAutoProps(zBEventConfig);

export const zEventConfigResponse = zEventConfig.extend({
  tickets: z.array(zEventTicket),
});

export type BEventConfig = z.infer<typeof zBEventConfig>;
export type EventConfig = z.infer<typeof zEventConfig>;
export type EventConfigResponse = z.infer<typeof zEventConfigResponse>;
