"use client";
import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useTicket } from "@/hooks/query/ticket/useTicket";
import { Calendar, MoreHorizontal, Pocket } from "react-feather";
import dayjs from "dayjs";
import rupiahConverter from "@/helpers/rupiahConverter";
import TicketCard from "./TicketCard";
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);

const TicketTabs = ({ userId }: { userId: string }) => {
  const { data: tickets = [], isLoading } = useTicket({ userId: userId });
  const activeTickets = tickets?.filter(
    (ticket) =>
      ticket.status === "success" &&
      new Date(ticket.playDate).setUTCHours(0, 0, 0, 0) >=
        new Date().setUTCHours(0, 0, 0, 0)
  );
  const nonActiveTickets = tickets?.filter(
    (ticket) =>
      ticket.status !== "success" ||
      new Date(ticket.playDate).setUTCHours(0, 0, 0, 0) <
        new Date().setUTCHours(0, 0, 0, 0)
  );
  return (
    <Tab.Group>
      <Tab.List className={"w-full grid grid-cols-2 mb-4"}>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={` font-semibold raleway outline-none text-gray-400 w-full ${
                selected ? "text-indigo-600 border-b-4 border-b-indigo-500" : ""
              }`}
            >
              Active Ticket
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={` font-semibold raleway outline-none text-gray-400 w-full ${
                selected ? "text-indigo-600 border-b-4 border-b-indigo-500" : ""
              }`}
            >
              Transaction List
            </button>
          )}
        </Tab>{" "}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className={"flex flex-col gap-3"}>
          {isLoading
            ? "Loading..."
            : !activeTickets?.length
            ? "No Data"
            : activeTickets.map((ticket) => (
                <TicketCard ticket={ticket} key={ticket.id} />
              ))}
        </Tab.Panel>
        <Tab.Panel className={"flex flex-col gap-3"}>
          {isLoading
            ? "Loading..."
            : !nonActiveTickets?.length
            ? "No Data"
            : nonActiveTickets.map((ticket) => (
                <TicketCard ticket={ticket} key={ticket.id} />
              ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TicketTabs;
