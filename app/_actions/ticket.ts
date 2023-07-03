"use server";

import { TicketCheckoutType } from "@/types";
import { cookies } from "next/headers";

export const getTicket = async () => {
  const ticket = cookies().get("ticketD")?.value;
  if (!ticket) return [];
  return ticket;
};

export const addTicket = async (input: TicketCheckoutType) => {
  const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // One hour in the future
  const cookieStore = cookies();
  cookieStore.set({
    name: "ticketD",
    value: JSON.stringify(input),
    expires: expirationTime,
  });
  console.log(cookieStore.get("ticketD"))
};
