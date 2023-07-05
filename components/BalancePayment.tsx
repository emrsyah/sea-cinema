"use client";
import rupiahConverter from "@/helpers/rupiahConverter";
import { useBalance } from "@/hooks/query/balance/useBalance";
import { useSubtractbalance } from "@/hooks/query/balance/useSubtractBalance";
import { useAddTicket } from "@/hooks/query/ticket/useAddTicket";
import { RequiredTicketParamsType } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const isBalanceEnough = (balance: number, total: number) => {
  return balance > total ? true : false;
};

const BalancePayment = ({
  userId,
  ticket,
}: {
  userId: string;
  ticket: RequiredTicketParamsType;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: subtractBalance } = useSubtractbalance({});

  const bookSuccess = () => {
    toast.success("Booking Success");
    subtractBalance({ userId: userId, amount: ticket.amount * ticket.price });
    router.replace("/");
  };
  const { data: balance, isLoading } = useBalance({ userId: userId });

  const { mutate, isLoading: loadingTicket } = useAddTicket({
    onSuccess: bookSuccess,
  });

  const payHandler = () => {
    if (isLoading) return;
    if (
      !isBalanceEnough(balance?.amount, ticket?.amount * ticket?.price) ||
      loadingTicket
    )
      return;
    mutate({ ticket: ticket });
  };

  const topUpHandler = () => {
    router.push(`/balance?callbackOnPayment=${pathname}`);
    return;
  };

  return (
    <>
      <div
        className={`p-2 rounded mt-1 flex items-center justify-between text-sm font-medium bg-gray-800 ${
          isLoading
            ? ""
            : isBalanceEnough(balance.amount, ticket.amount * ticket.price)
            ? "bg-green-600 bg-opacity-30 border-[1.5px] border-green-500"
            : "bg-red-600 bg-opacity-30 border-[1.5px] border-red-500"
        } `}
      >
        <div>
          <span className="text-xl">💡</span> Your Balance:{" "}
          {isLoading ? "Loading..." : rupiahConverter(balance.amount)}
        </div>
        {isBalanceEnough(
          balance?.amount,
          ticket?.amount * ticket?.price
        ) ? null : (
          <button
            onClick={topUpHandler}
            className="underline text-gray-300 hover:text-white"
          >
            Top Up
          </button>
        )}
      </div>
      <button
        onClick={payHandler}
        disabled={
          !isBalanceEnough(balance?.amount, ticket?.amount * ticket?.price) ||
          loadingTicket
        }
        className={`btn-primary mt-3 w-full ${
          isLoading
            ? "opacity-50 hover:bg-indigo-500"
            : loadingTicket
            ? "opacity-50 hover:bg-indigo-500"
            : isBalanceEnough(balance?.amount, ticket?.amount * ticket?.price)
            ? "cursor-pointer"
            : "opacity-50 hover:bg-indigo-500"
        } `}
      >
        {loadingTicket
          ? "Loading..."
          : isBalanceEnough(balance?.amount, ticket?.amount * ticket?.price)
          ? "Confirm Payment"
          : "Insufficient balance, please top up first"}
      </button>
    </>
  );
};

export default BalancePayment;
