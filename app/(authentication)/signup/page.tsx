"use client";
import { FormSignUpType } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import InputErrorIndicator from "@/components/InputErrorIndicator";

const SignUp = () => {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSignUpType>();

  const submitHandler: SubmitHandler<FormSignUpType> = async (input) => {
    if (input.password !== input.passwordConfirmation) {
      setError("passwordConfirmation", { type: "notMatched" });
      return;
    }
    try {
      const res = await signUp?.create({
        username: input.username,
        password: input.password,
      });
      console.log(res);
      if (res?.status === "complete") {
        router.push("/profile");
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
      if (err.errors[0].longMessage.includes("username is taken")) {
        setError("username", { type: "unameTaken" });
      }
    }
    // console.log(data)
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex w-full pb-4 justify-center items-center">
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
            Create an Account
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
          <div className="w-full flex gap-1 flex-col">
            <h5 className="text-sm font-semibold raleway">
              Password Confirmation
            </h5>
            <input
              type="password"
              className="input-txt w-full text-sm"
              placeholder="Password"
              {...register("passwordConfirmation", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.passwordConfirmation && (
              <InputErrorIndicator type={errors.passwordConfirmation.type} />
            )}
          </div>
          <button className="btn-primary w-full mt-2">Sign Up Now</button>
          <p className="text-sm mt-2 text-gray-300">
            Have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="font-medium cursor-pointer hover:text-indigo-500 underline"
            >
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
