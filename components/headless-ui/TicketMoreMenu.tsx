"use client";
import { useCancelModalStore, useReviewModalStore } from "@/store";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Eye, MoreHorizontal, Star, Trash } from "react-feather";

const TicketMoreMenu = ({
  isActive,
  seats,
  ticketId,
  total,
  status,
  movieName
}: {
  isActive: boolean;
  seats: number[];
  ticketId: number;
  total: number;
  status: "success" | "cancelled" | "failed",
  movieName: string
}) => {
  const router = useRouter();
  const { toggle, setTicket, setTotal } = useCancelModalStore();
  const {toggle: toggleReview , setMovieName} = useReviewModalStore()

  const cancelHandler = () => {
    if (!isActive) {
      return;
    }
    toggle();
    setTicket(ticketId);
    setTotal(total);
  };

  const reviewHandler = () => {
    if(isActive || status === "cancelled") return
    toggleReview()
    setMovieName(movieName)
  }

  return (
    <>
      <Menu as="div" className="relative items-center">
        <Menu.Button className="px-1 rounded hover:bg-gray-900">
          <MoreHorizontal className="w-4 " />
        </Menu.Button>
        <Menu.Items className="flex  items-start flex-col  text-[15px] z-20 font-normal p-2 w-56 text-sm gap-1 rounded bg-gray-800 absolute right-0">
          {!isActive && status !== "cancelled" ? (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`text-gray-400 font-medium text-sm flex items-center gap-3 w-full p-1 ${
                    active && "text-white"
                  }`}
                  //   href="/account-settings"
                  onClick={reviewHandler}
                >
                  <Star className="w-4" />
                  Review Movie
                </button>
              )}
            </Menu.Item>
          ) : null}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() =>
                  router.push(`m/seat-preview?seat=${seats.join(",")}`)
                }
                className={`text-gray-400 font-medium text-sm flex items-center gap-3 w-full p-1 ${
                  active && "text-white"
                }`}
                //   href="/account-settings"
              >
                <Eye className="w-4" />
                See Position
              </button>
            )}
          </Menu.Item>
          {isActive ? (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`text-gray-400 font-medium text-sm flex items-center gap-3 w-full p-1 ${
                    active && "text-red-500"
                  }`}
                  //   href="/account-settings"
                  onClick={cancelHandler}
                >
                  <Trash className="w-4" />
                  Cancel Book
                </button>
              )}
            </Menu.Item>
          ) : null}
        </Menu.Items>
      </Menu>
    </>
  );
};

export default TicketMoreMenu;
