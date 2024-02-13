import { BookingType } from "../booking";

export interface PaymentIntent {
  id: string;
  type: BookingType;
}
