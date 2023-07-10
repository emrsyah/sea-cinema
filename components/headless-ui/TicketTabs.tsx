"use client";
import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useTicket } from "@/hooks/query/ticket/useTicket";
import TicketCard from "../TicketCard";
import CancelBookConfirmationModal from "./CancelBookConfirmationModal";
import NoData from "../layouts/NoData";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TicketTabs = ({ userId }: { userId: string }) => {
  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useTicket({ userId: userId });
  const activeTickets = tickets?.filter(
    (ticket) =>
      ticket.status === "success" &&
      new Date(ticket.playDate).setUTCHours(0, 0, 0, 0) >=
        new Date().setUTCHours(0, 0, 0, 0)
  );
  // console.log(activeTickets)
  const nonActiveTickets = tickets?.filter(
    (ticket) =>
      ticket.status !== "success" ||
      new Date(ticket.playDate).setUTCHours(0, 0, 0, 0) <
        new Date().setUTCHours(0, 0, 0, 0)
  );

  return (
    <>
      <CancelBookConfirmationModal userId={userId} refetcher={refetch} />
      <Tab.Group>
        <Tab.List className={"w-full grid grid-cols-2 mb-4"}>
          <Tab as={Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={` font-semibold text-lg raleway outline-none text-gray-400 w-full ${
                  selected
                    ? "text-indigo-600 border-b-4 border-b-indigo-500"
                    : ""
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
                className={` font-semibold text-lg raleway outline-none text-gray-400 w-full ${
                  selected
                    ? "text-indigo-600 border-b-4 border-b-indigo-500"
                    : ""
                }`}
              >
                Transaction List
              </button>
            )}
          </Tab>{" "}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className={"flex flex-col gap-3"}>
            {isLoading ? (
              <SkeletonTheme
                baseColor="#030712"
                highlightColor="#1F2937"
                height={32}
              >
                <div className="flex gap-4">
                  <Skeleton count={2} width={420} className="w-full" />
                </div>
              </SkeletonTheme>
            ) : !activeTickets?.length ? (
              <NoData content="Empty ticket, go buy some" />
            ) : (
              activeTickets.map((ticket) => (
                <TicketCard isActive={true} ticket={ticket} key={ticket.id} />
              ))
            )}
          </Tab.Panel>
          <Tab.Panel className={"flex flex-col gap-3"}>
            {isLoading ? (
              <SkeletonTheme
                baseColor="#030712"
                highlightColor="#1F2937"
                height={32}
              >
                <div className="flex gap-4">
                  <Skeleton count={2} width={420} />
                </div>
              </SkeletonTheme>
            ) : !nonActiveTickets?.length ? (
              <NoData content="No transaction yet" />
            ) : (
              nonActiveTickets.map((ticket) => (
                <TicketCard isActive={false} ticket={ticket} key={ticket.id} />
              ))
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default TicketTabs;
