import MovieCard from "@/components/MovieCard";
import MovieGrid from "@/components/MovieGrid";
import Selector from "@/components/Selector";
import { MovieItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Search } from "react-feather";

async function getMovies(): Promise<MovieItem[]> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies", { next: { revalidate: 3600 } });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const movies = await getMovies();
  return (
    <main>
      <nav className="p-6 flex items-center justify-between">
        <h3 className="font-bold text-lg raleway text-indigo-500">
          sea<span className="text-white raleway">cinema</span>
        </h3>
        <div className="flex items-center gap-6 raleway text-sm">
          <button className="btn-secondary">Masuk</button>
          <button className="btn-primary">Daftar Sekarang</button>
        </div>
      </nav>
      <div className="max-w-7xl m-6 gap-4 grid grid-cols-6 items-center ">
        <div className="col-span-4 flex flex-col gap-2">
          {/* <h1 className='text-4xl font-bold raleway'>Movies at Your Fingertips.</h1> */}
          <h1 className="text-6xl font-bold raleway uppercase tracking-widest ">
            Your Movie <span className="text-indigo-500">Magic</span> Experience
            Begins with <span className="text-indigo-500">Easy</span> Booking.
          </h1>
          <h3 className="raleway font-medium">
            Unleash the Cinematic Experience: Easy Booking, Memorable Movies!
          </h3>
          <button className="btn-primary w-fit mt-4 text-lg">
            Explore Your Next Movie
          </button>
        </div>
        <div className="col-span-2 items-center justify-center flex">
          <Link
            href={"/"}
            className="rounded-lg shadow-lg  hover:scale-[102%] transition-all duration-200 ease-out cursor-pointer"
          >
            <div className="w-full relative">
              <Image
                width={560}
                height={560}
                src={
                  "https://image.tmdb.org/t/p/w500/nAbpLidFdbbi3efFQKMPQJkaZ1r.jpg"
                }
                className="w-full h-full object-cover rounded-lg"
                alt=""
              />
              <div
                className={`font-semibold flex flex-col gap-1 w-full px-2 raleway pt-16 pb-2 absolute bottom-0 text-white bg-gradient-to-b from-transparent h-36 to-black`}
              >
                <h3>Guardians of the Galaxy Vol. 3</h3>
                <div className="flex items-center gap-2">
                  <div className="text-white bg-indigo-500 rounded-full px-3 py-1 text-xs">
                    12+
                  </div>
                  <div className="text-white bg-indigo-500 rounded-full px-3 py-1 text-xs">
                    Aug 2020
                  </div>
                </div>
                <h3 className="mt-1 font-bold text-indigo-500">Rp 56.0000</h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="max-w-7xl flex flex-col mx-6 mt-20 mb-6">
      <MovieGrid movies={movies} />
      </div>
    </main>
  );
}
