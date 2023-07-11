import rupiahConverter from "@/helpers/rupiahConverter";
import { TicketType } from "@/types";
import dayjs from "dayjs";
import React from "react";
import { Calendar, Pocket } from "react-feather";
import TicketMoreMenu from "./headless-ui/TicketMoreMenu";

const TicketCard = ({ticket, isActive} : {ticket: TicketType, isActive: boolean}) => {
  return (
    <div
      className="pt-1 px-1 pb-2 border-b-[1.5px] border-gray-800"
    >
      <div className="w-full flex justify-between gap-3">
        <h3 className="font-semibold text-xl raleway">{ticket.movieName}</h3>
        {ticket.status === "cancelled" ? (
          <div className="bg-red-300 py-1 px-3 rounded-full flex items-center justify-center text-red-600 text-xs border-[1.2px] border-red-600 font-bold">
            cancelled
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex text-sm text-gray-400 font-medium items-center gap-2">
          <Calendar className="w-4" />
          {dayjs(ticket.playDate).format("DD MMMM")}
        </div>
        <div className="flex text-sm text-gray-400 font-medium items-center gap-2">
          <Pocket className="w-4" />
          Seat: {ticket.seat.join(", ")}
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex text-sm text-gray-400 font-medium items-center gap-2">
            Total: {rupiahConverter(ticket.amount * ticket.price)}
          </div>
          <TicketMoreMenu movieName={ticket.movieName} status={ticket.status} isActive={isActive} seats={ticket.seat} ticketId={ticket.id} total={(ticket.amount * ticket.price)} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
