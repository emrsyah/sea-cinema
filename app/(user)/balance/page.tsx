import Balance from "@/components/Balance";
import { TopUpWithdrawTabs } from "@/components/headless-ui/TopUpWithdrawTabs";
import PlainNavbar from "@/components/layouts/PlainNavbar";
import { currentUser, useUser } from "@clerk/nextjs";
import React from "react";

const BalancePage = async () => {
  const user = await currentUser();
  return (
    <>
      <PlainNavbar title="Your Balance" />
      <div className="max-w-lg mx-auto flex flex-col gap-2 bg-gray-950 p-6 rounded my-6">
        <button></button>
        <Balance userId={user? user.id : ""} />
        <div className="border-t-[1px] border-dotted border-t-gray-900 py-4">
          <TopUpWithdrawTabs userId={user ? user.id : ""} />
        </div>
      </div>
    </>
  );
};

export default BalancePage;
