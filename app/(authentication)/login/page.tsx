"use client";
import InputErrorIndicator from "@/components/InputErrorIndicator";
import { FormLoginType } from "@/types";
import {  useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormLoginType>();

  const submitHandler: SubmitHandler<FormLoginType> = async (input) => {
    if (!isLoaded) return;
    const toastId = toast.loading("Please wait...");

    try {
      const result = await signIn.create({
        identifier: input.username,
        password: input.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
        toast.update(toastId, {
          render: "Welcome Back",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      } else {
        toast.update(toastId, {
          render: "Something Wrong",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
        /*Investigate why the login hasn't completed */
        // console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
      if (
        err.errors[0].longMessage.includes("find your account") ||
        err.errors[0].longMessage.includes("Password is incorrect")
      ) {
        setError("password", { type: "wrongPasswordOrUname" });
        toast.dismiss(toastId);
        return;
      } else if (err.errors[0].longMessage.includes("single session mode")) {
        toast.update(toastId, {
          render: "You already logged in",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
        return;
      }
      toast.update(toastId, {
        render: "Something Wrong",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-full flex-col gap-2">
        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer hover:opacity-90 flex items-center justify-center py-10 px-2 raleway text-xl font-bold opacity-50 "
          >
            seacinema
          </button>
        </div>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="justify-center w-full mx-auto max-w-md gap-3 flex flex-col items-center shadow-xl rounded-xl px-6 my-2 py-12 bg-gray-950"
        >
          <h3 className="text-3xl mb-2 text-indigo-400 text-center raleway font-bold">
            Welcome Back
          </h3>
          <div className="w-full flex gap-1 flex-col">
            <h5 className="text-sm font-semibold raleway">Username</h5>
            <input
              type="text"
              className="input-txt w-full text-sm"
              placeholder="Your username"
              {...register("username", { required: true, minLength: 5 })}
            />
            {errors.username && (
              <InputErrorIndicator
                type={errors.username.type}
                inputLength={5}
              />
            )}
          </div>
          <div className="w-full flex gap-1 flex-col">
            <h5 className="text-sm font-semibold raleway">Password</h5>
            <input
              type="password"
              className="input-txt w-full text-sm"
              placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <InputErrorIndicator type={errors.password.type} />
            )}
          </div>
          <button className="btn-primary w-full mt-2">Log in</button>
          <p className="text-sm mt-2 text-gray-300">
            Need an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="font-medium cursor-pointer hover:text-indigo-500 underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
