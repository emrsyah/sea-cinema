"use client";
import { useReview } from "@/hooks/query/review/useReview";
import { Tab } from "@headlessui/react";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { Star } from "react-feather";

const SynopsisReviewTabs = ({
  synopsis,
  movieName,
}: {
  synopsis: string;
  movieName: string;
}) => {
  const { data } = useReview({ movieName: movieName });
  // console.log(data);
  return (
    <Tab.Group>
      <Tab.List className={"w-full grid grid-cols-2 mb-2"}>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={` font-semibold text-start text-lg pl-2 pb-1 raleway outline-none text-gray-400 w-full ${
                selected
                  ? "text-indigo-600 border-b-4 border-b-indigo-500"
                  : "text-gray-600 border-b-2 border-b-gray-500"
              }`}
            >
              Synopsis
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={` font-semibold text-start text-lg pl-2 pb-1 raleway outline-none text-gray-400 w-full ${
                selected
                  ? "text-indigo-600 border-b-4 border-b-indigo-500"
                  : "text-gray-600 border-b-2 border-b-gray-500"
              }`}
            >
              Review & Rating
            </button>
          )}
        </Tab>{" "}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <p className="text-gray-300 ">{synopsis}</p>
        </Tab.Panel>
        <Tab.Panel>
          <div className="flex flex-col gap-3">
            <div className="text-2xl flex items-center gap-2 font-semibold raleway">
              <Star />
              Overall Rating:{" "}
              {data?.avgRating ? (
                <div className="text-indigo-500 flex items-end gap-1">
                  {data.avgRating.toString().length > 3
                    ? data.avgRating.toFixed(1)
                    : data.avgRating}
                  /5{" "}
                  <p className="text-sm font-medium text-gray-600">
                    ({data.review?.length})
                  </p>
                </div>
              ) : (
                "No rating yet"
              )}
            </div>
            {/* Batasin jadi 3 review, sisanya pindahin ke page khusus */}
            {data?.review?.length ? (
              <div>
                <h3 className="font-semibold  text-gray-600">Last 3 Reviews</h3>
                <div className="mt-2 flex flex-col gap-2 max-h-56">
                  {data.review.map((rev) => (
                    <div key={rev.id} className="flex gap-4">
                      <img
                        src={`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${rev.username}`}
                        height={20}
                        width={20}
                        alt="profile"
                        className="rounded-full w-9 h-9 border-[2px] border-indigo-400 p-[2px]"
                      />
                      <div className="flex flex-col border-b-[1.5px] pb-2 w-full border-b-gray-800">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">
                            {rev.username}{" "}
                            <span className="text-indigo-500 font-medium text-sm">
                              <span className="text-gray-400">|</span> Rated:{" "}
                              {rev.rating}/5
                            </span>{" "}
                          </h3>
                          <p className="font-medium text-sm text-gray-300">
                            {dayjs(rev.createdAt).format("MMMM D, YYYY")}
                          </p>
                        </div>
                        <p className="text-gray-400">{rev.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default SynopsisReviewTabs;
