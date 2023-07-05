"use client";
import rupiahConverter from "@/helpers/rupiahConverter";
import { useBalance } from "@/hooks/query/balance/useBalance";
import React from "react";

const Balance = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useBalance({ userId: userId });

  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-400">Total:</p>
      <h5 className="font-semibold text-3xl">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          rupiahConverter(data ? data.amount : 0)
        )}
      </h5>
    </div>
  );
};

export default Balance;
