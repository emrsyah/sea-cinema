import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
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

type newPasswordInput = {
  password: string;
  currentPassword: string;
};

const SettingsModal = ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  const { isOpen, toggle } = useSettingModalStore();
  const { user, isLoaded, isSignedIn } = useUser();
  const [isChangePw, setIsChangePw] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ageInput>();

  const {
    register: registerPw,
    formState: { errors: errorsPw },
    setValue,
    handleSubmit: handleSubmitPw,
  } = useForm<newPasswordInput>();

  const saveAgeHandler: SubmitHandler<ageInput> = async (input) => {
    if (!isLoaded || !isSignedIn) return;
    try {
      await user.update({
        unsafeMetadata: {
          age: input.age,
        },
      });
      toast.success("Change age success", { autoClose: 1500 });
    } catch (err) {
      console.error("error", err);
    }
  };

  const changePwHandler: SubmitHandler<newPasswordInput> = async (input) => {
    if (!isLoaded || !isSignedIn) return;
    try {
      await user.updatePassword({
        newPassword: input.password,
        currentPassword: input.currentPassword,
      });
      toast.success("Password changed!", { autoClose: 1500 });
      setValue("password", "");
      setValue("currentPassword", "");
      setIsChangePw(false);
      toggle();
    } catch (err) {
      console.error("error", err);
    }
  };

  const closeHandler = () => {
    toggle();
    setIsChangePw(false);
    setValue("password", "");
    setValue("currentPassword", "");
  };

  return (
    <Dialog open={isOpen} onClose={closeHandler} className="relative z-50">
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
                className="rounded-full w-10 h-10 border-[2px] border-indigo-400 p-[2px]"
              />
              <h5 className="font-semibold text-xl raleway">{username}</h5>
            </div>
            <button
              className="p-1 rounded hover:text-white text-gray-500"
              onClick={toggle}
            >
              <X className="w-4" />
            </button>
          </div>
          <div className="gap-2 flex flex-col px-4 w-full">
            <form
              onSubmit={handleSubmit(saveAgeHandler)}
              className="w-full flex gap-2 items-end"
            >
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
              <button className="btn-primary text-sm">Save</button>
              {errors.age && <InputErrorIndicator type={errors.age.type} />}
            </form>
            <div className="h-[1px] bg-gray-800 my-2 w-full"></div>
            {!isChangePw ? (
              <button
                onClick={() => setIsChangePw(true)}
                className="btn-secondary"
              >
                Change Password
              </button>
            ) : (
              <form onSubmit={handleSubmitPw(changePwHandler)} className="flex flex-col gap-3">
                <div className="w-full flex gap-1 flex-col">
                  <div className="flex w-full gap-1 flex-col ">
                    <h5 className="text-sm font-semibold raleway">
                      Current Password
                    </h5>
                    <input
                      type="password"
                      className="input-txt w-full text-sm"
                      placeholder="Current Password"
                      min={1}
                      {...registerPw("currentPassword", {
                        required: true,
                        minLength: 8,
                      })}
                    />
                  </div>
                  {errorsPw.currentPassword && (
                    <InputErrorIndicator type={errorsPw.currentPassword.type} />
                  )}
                </div>
                <div className="w-full flex gap-1 flex-col">
                  <div className="flex w-full gap-1 flex-col ">
                    <h5 className="text-sm font-semibold raleway">
                      New Password
                    </h5>
                    <input
                      type="password"
                      className="input-txt w-full text-sm"
                      placeholder="New Password"
                      min={1}
                      {...registerPw("password", {
                        required: true,
                        minLength: 8,
                      })}
                    />
                  </div>
                  {errorsPw.password && (
                    <InputErrorIndicator type={errorsPw.password.type} />
                  )}
                </div>
                <button className="btn-primary text-sm">Confirm</button>
              </form>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SettingsModal;
