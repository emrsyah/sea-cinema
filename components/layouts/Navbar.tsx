"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import rupiahConverter from "@/helpers/rupiahConverter";
import ProfileMenu from "../ProfileMenu";

const Navbar = () => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <nav className="p-6 flex items-center justify-between">
      <Link href={"/"} className="font-bold text-lg raleway text-indigo-500">
        sea<span className="text-white raleway">cinema</span>
      </Link>
      <div className="flex items-center gap-6 text-sm">
        {isLoaded ? (
          isSignedIn ? (
            <>
            <button className="bg-gray-950 hover:bg-gray-900 font-medium p-2 px-4 rounded-md">Balance: {rupiahConverter(250000)}</button>
            <ProfileMenu username={user.username as string} />
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => router.push("/login")}
                className="btn-secondary"
              >
                Masuk
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="btn-primary"
              >
                Daftar Sekarang
              </button>
            </>
          )
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
