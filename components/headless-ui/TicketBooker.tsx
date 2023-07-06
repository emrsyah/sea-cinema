"use client";
import { getThreeDays } from "@/helpers/getThreeDays";
import { useUser } from "@clerk/nextjs";
import { RadioGroup } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CustomToast = () => (
  <h5>
    You must <Link href={"/login"} className="font-medium text-indigo-400 underline hover:text-indigo-600">log in</Link> to proceed
  </h5>
);

const TicketBooker = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [dayOption, setDayOption] = useState(getThreeDays());
  const [selectedDay, setSelectedDay] = useState(dayOption[0]);
  const { isLoaded, isSignedIn } = useUser();

  const bookTicketHandler = () => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      toast.error(CustomToast);
      return;
    }
    router.push(`${pathname}/book?date=${selectedDay.longDate}`);
  };

  return (
    <>
      <RadioGroup
        value={selectedDay}
        onChange={setSelectedDay}
        className={"flex gap-4 items-center my-3 font-medium"}
      >
        {dayOption.map((day, i) => (
          <RadioGroup.Option
            key={day.date}
            className={"flex-1 cursor-pointer "}
            value={day}
          >
            {({ checked }) => (
              <div
                className={`${
                  checked
                    ? "text-indigo-600 font-semibold border-b-4 border-indigo-500"
                    : "text-gray-200"
                } p-2`}
              >
                <p className="text-sm">{day.day}</p>
                <div className="flex flex-col md:flex-row gap-2">
                  <h5 className="text-2xl">{day.date}</h5>
                  {i === 0 ? (
                    <p className="hidden md:flex text-sm items-center chip-primary">
                      Today
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <button onClick={bookTicketHandler} className="btn-primary w-full mt-2">
        Buy Ticket
      </button>
    </>
  );
};

export default TicketBooker;
