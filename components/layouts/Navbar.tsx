"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/nextjs";
import rupiahConverter from "@/helpers/rupiahConverter";
import ProfileMenu from "../headless-ui/ProfileMenu";
import { useBalance } from "@/hooks/query/balance/useBalance";

const Navbar = ({userId} : {userId: string}) => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const { data, error, isLoading } = useBalance({
    userId: userId ? userId : "",
  });
  return (
    <nav className="p-6 flex items-center justify-between">
      <Link href={"/"} className="font-bold text-lg raleway text-indigo-500">
        sea<span className="text-white raleway">cinema</span>
      </Link>
      <div className="flex items-center gap-6 text-sm">
        {isLoaded ? (
          isSignedIn ? (
            <>
              <button onClick={() => router.push("/balance")} className="bg-gray-950 hover:bg-gray-900 font-medium p-2 px-4 rounded-md">
                Balance: {rupiahConverter(data?.amount === undefined ? "0" : data.amount)}
              </button>
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
