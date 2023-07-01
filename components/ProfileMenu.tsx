"use client"
import { useAuth } from "@clerk/nextjs";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { DollarSign, LogOut, Pocket } from "react-feather";

const ProfileMenu = ({username} : {username: string}) => {
    const {isLoaded, signOut} = useAuth()
    const router = useRouter()

   const logoutHandler = () => {
    if(!isLoaded){
        console.error("try later")
    }
    signOut()
    router.refresh()
   }

  return (
    <Menu as="div" className="relative items-center">
      <Menu.Button>
        <img
          src={`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${username}`}
          height={20}
          width={20}
          alt="profile"
          className="rounded-full cursor-pointer w-10 h-10 border-[2px] border-indigo-400 hover:border-indigo-600 p-[2px]"
        />
      </Menu.Button>
      <Menu.Items className="flex  items-start flex-col mt-1 text-[15px] z-20 font-normal p-3 w-56 text-sm gap-1 rounded bg-gray-950 absolute right-0">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`text-gray-400 font-medium text-sm flex items-center gap-4 w-full p-2 ${active && "text-white"}`}
            //   href="/account-settings"
            >
              <Pocket className="w-5" />
               My Ticket
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`text-gray-400 font-medium text-sm flex items-center gap-4 w-full p-2 ${active && "text-white"}`}
            //   href="/account-settings"
            >
              <DollarSign className="w-5" />
               Balance
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`text-gray-400 font-medium text-sm flex items-center gap-4 w-full p-2 ${active && "text-red-500"}`}
            //   href="/account-settings"
            onClick={logoutHandler}
            >
              <LogOut className="w-5" />
               Sign Out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ProfileMenu;
