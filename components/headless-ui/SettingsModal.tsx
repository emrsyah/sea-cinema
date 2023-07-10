import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import InputErrorIndicator from "../InputErrorIndicator";
import { useUser } from "@clerk/nextjs";
import { useSettingModalStore } from "@/store";
import { X } from "react-feather";
import { toast } from "react-toastify";
// Atasnya profile sama  username, bawahnya age buat diatur, sama ada tombol reset passwrod yang bakal ngebuka input password dan sebuah button konfirmasi
// Import di navbar aja kali

type ageInput = {
  age: number;
};

const SettingsModal = ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  const {isOpen, toggle} = useSettingModalStore()
  const { user, isLoaded, isSignedIn } = useUser();
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<ageInput>();

  const saveAgeHandler = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      await user.update({
        unsafeMetadata: {
          age: getValues("age"),
        },
      });
      toast.success("Change age success", {autoClose: 1500})
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-lg rounded-md flex flex-col gap-4 bg-gray-950  py-4 shadow-xl w-full">
          <div className="flex items-center gap-2 justify-between border-b-[1.2px] border-gray-600 pb-3 px-3">
            <div className="flex items-center gap-3">
              {/* <UilInfoCircle size="24" /> */}
              <img
                src={`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${username}`}
                height={25}
                width={25}
                alt="profile"
                className="rounded-full cursor-pointer w-10 h-10 border-[2px] border-indigo-400 hover:border-indigo-600 p-[2px]"
              />
              <h5 className="font-semibold text-xl raleway">{username}</h5>
            </div>
            <button className="p-1 rounded hover:text-white text-gray-500" onClick={toggle}>
            <X className="w-4" />
            </button>
          </div>
          <div className="gap-2 flex flex-col px-4 w-full">
            <div className="w-full flex gap-2 items-end">
              <div className="flex w-full gap-1 flex-col ">
                <h5 className="text-sm font-semibold raleway">Age</h5>
                <input
                  type="number"
                  className="input-txt w-full text-sm"
                  placeholder="Your Age"
                  defaultValue={age}
                  min={1}
                  {...register("age", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
              </div>
              <button onClick={saveAgeHandler} className="btn-primary text-sm">
                Save
              </button>
              {errors.age && <InputErrorIndicator type={errors.age.type} />}
            </div>
            <div className="h-[1px] bg-gray-800 my-2 w-full"></div>
            <button className="btn-secondary">Change Password</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SettingsModal;
