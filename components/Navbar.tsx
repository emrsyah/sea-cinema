"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter()
  return (
    <nav className="p-6 flex items-center justify-between">
      <Link href={'/'} className="font-bold text-lg raleway text-indigo-500">
        sea<span className="text-white raleway">cinema</span>
      </Link>
      <div className="flex items-center gap-6 raleway text-sm">
        <button onClick={() => router.push("/login")} className="btn-secondary">Masuk</button>
        <button onClick={() => router.push("/signup")} className="btn-primary">Daftar Sekarang</button>
      </div>
    </nav>
  );
};

export default Navbar;
