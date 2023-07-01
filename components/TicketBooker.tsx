"use client";
import { getThreeDays } from "@/helpers/getThreeDays";
import { RadioGroup } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketBooker = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [dayOption, setDayOption] = useState(getThreeDays());
  const [selectedDay, setSelectedDay] = useState(dayOption[0]);
  
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
                {i === 0 ? <p className="hidden md:flex text-sm items-center chip-primary">Today</p> : null}
              </div>
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
    <button onClick={() => router.push(`${pathname}/book`)} className="btn-primary w-full mt-2">Buy Ticket</button>
    </>
  );
};

export default TicketBooker;
