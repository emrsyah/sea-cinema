"use client";
import { useAddBalance } from "@/hooks/query/balance/useAddBalance";
import { useBalance } from "@/hooks/query/balance/useBalance";
import { useWithdraw } from "@/hooks/query/balance/useWithdraw";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

export const TopUpWithdrawTabs = ({userId} : {userId: string}) => {
  const {refetch, data: balance} = useBalance({userId: userId})
  const { mutate: mutateTopUp } = useAddBalance({onSuccess : refetch});
  const { mutate: mutateWithdraw } = useWithdraw({onSuccess : refetch});
  const [amountTu, setAmountTu] = useState(0);
  const [amountWi, setAmountWi] = useState(0);
  const router = useRouter()

  const topUpHandler = () => {
    mutateTopUp({amount: amountTu, userId: userId})
    setAmountTu(0)
  };

  const withdrawHandler = () => {
    if(balance.amount === 0 || balance.amount < amountWi){
      toast.error("Withdraw more than balance")
      return
    }
    mutateWithdraw({amount: amountWi, userId: userId})
    setAmountWi(0)
  };

  return (
    <Tab.Group>
      <Tab.List className={"w-full grid grid-cols-2 mb-3"}>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={` font-semibold raleway outline-none text-gray-400 w-full ${
                selected ? "text-indigo-600 border-b-4 border-b-indigo-500" : ""
              }`}
            >
              Top Up
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
              Withdraw
            </button>
          )}
        </Tab>{" "}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <input
            type="number"
            className="input-txt w-full text-sm"
            placeholder="Amount"
            value={amountTu}
            min={0}
            onChange={(ev) => setAmountTu(parseInt(ev.currentTarget.value))}
          />
          <button
            onClick={topUpHandler}
            className="btn-primary w-full text-sm mt-2"
          >
            Top Up Now
          </button>
        </Tab.Panel>
        <Tab.Panel>
          <input
            type="number"
            className="input-txt w-full text-sm"
            placeholder="Amount"
            value={amountWi}
            min={0}
            onChange={(ev) => setAmountWi(parseInt(ev.currentTarget.value))}
          />
          <button
            onClick={withdrawHandler}
            className="btn-primary w-full text-sm mt-2"
          >
            Withdraw
          </button>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
