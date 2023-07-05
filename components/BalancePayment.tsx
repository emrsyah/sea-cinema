"use client";
import rupiahConverter from "@/helpers/rupiahConverter";
import { useBalance } from "@/hooks/query/balance/useBalance";
import { useAddTicket } from "@/hooks/query/ticket/useAddTicket";
import { RequiredTicketParamsType } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const BalancePayment = ({
  userId,
  ticket,
}: {
  userId: string;
  ticket: RequiredTicketParamsType;
}) => {

  const router = useRouter()

  const bookSuccess = () => {
    toast.success("Booking Success")
    router.replace("/")
  }

  const { data: balance, isLoading } = useBalance({ userId: userId });
  const {mutate} = useAddTicket({onSuccess: bookSuccess})

  const payHandler = () => {
    mutate({ticket: ticket})
  }

  return (
    <>
      <div
        className={`p-2 rounded mt-1 text-sm font-medium bg-gray-800 ${
          isLoading
            ? ""
            : balance.amount > (ticket.amount * ticket.seat.length)
            ? "bg-green-600 bg-opacity-30 border-[1.5px] border-green-500"
            : "bg-red-600 bg-opacity-30 border-[1.5px] border-red-500"
        } `}
      >
        <span className="text-xl">💡</span> Your Balance:{" "}
        {isLoading ? "Loading..." : rupiahConverter(balance.amount)}
      </div>
      <button onClick={payHandler} className="btn-primary mt-3 w-full">Confirm Payment</button>
    </>
  );
};

export default BalancePayment;
