import { z } from "zod";
import { type BPaymentInfo, type BUserInfo, zBPaymentInfo, zBUserInfo } from "../booking";
import {
  type EventTicketReg,
  type EventTicketRegResponse,
  zEventTicketReg,
  zEventTicketRegResponse,
} from "./eTicketReg";
import { addAutoProps, type AutoProps } from "../addAutoProps";

export interface BEventReg extends BUserInfo, BPaymentInfo {
  agaId: string;
  tournamentId: string;
  tickets: EventTicketReg[];
  /**
   * @units CENTS - Donation in cents
   */
  donation?: number;
  /**
   * How the registration was created, through public endpoint or admin
   */
  createMethod?: string;
}

export interface EventReg extends BEventReg, AutoProps {}

export interface EventRegResponse extends Omit<EventReg, "tickets"> {
  tickets: EventTicketRegResponse[];
}

export const zBEventReg = z
  .object({
    agaId: z.string(),
    tournamentId: z.string(),
    tickets: z.array(zEventTicketReg),
    /**
     * @units CENTS - Donation in cents
     */
    donation: z.coerce.number().optional(),
    /**
     * How the registration was created, through public endpoint or admin
     */
    createMethod: z.string().optional(),
  })
  .merge(zBUserInfo)
  .merge(zBPaymentInfo);

export const zEventReg = addAutoProps(zBEventReg);

export const zEventRegResponse = zEventReg.extend({
  tickets: z.array(zEventTicketRegResponse),
});
