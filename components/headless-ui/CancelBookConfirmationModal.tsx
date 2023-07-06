"use client";
import { useAddBalance } from "@/hooks/query/balance/useAddBalance";
import { useCancelTicket } from "@/hooks/query/ticket/useCancelTicket";
import { useCancelModalStore } from "@/store";
import { Dialog } from "@headlessui/react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import React from "react";
import { AlertTriangle, X } from "react-feather";
import { toast } from "react-toastify";

const CancelBookConfirmationModal = ({
  userId,
  refetcher,
}: {
  userId: string;
  refetcher: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any[] | null, unknown>>;
}) => {
  const { isOpen, toggle, ticketId, totalPrice } = useCancelModalStore();

  const successCancelHandler = () => {
    addBalance({ userId: userId, amount: totalPrice });
  };

  const successRefundHandler = () => {
    toggle();
    refetcher()
    toast.success("Cancel and refund success");
  };

  const { mutate: cancelTicket } = useCancelTicket({
    onSuccess: successCancelHandler,
  });
  const { mutate: addBalance } = useAddBalance({
    onSuccess: successRefundHandler,
  });

  const confirmHandler = () => {
    cancelTicket({ ticketId: ticketId });
  };

  return (
    <Dialog open={isOpen} onClose={toggle} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto w-[650px] max-w-sm rounded bg-gray-900 p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="flex items-center gap-3 font-semibold">
              <div className="rounded-full bg-red-300 p-1 text-red-600">
                <AlertTriangle size="20" />
              </div>
              <p className="raleway">Cancel Confirmation</p>
            </Dialog.Title>
            <button onClick={toggle}>
              <X size="20" />
            </button>
          </div>
          <div className="mt-3 mb-5">
            <p className="font-normal tracking-wide text-gray-300">
              Do you sure to cancel and refund?
            </p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={toggle}
              className="py-1 px-2 text-sm btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={confirmHandler}
              className="py-1 px-2 text-sm font-medium rounded bg-red-600 text-white hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CancelBookConfirmationModal;
