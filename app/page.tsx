import MovieCard from "@/components/MovieCard";
import MovieGrid from "@/components/MovieGrid";
import Navbar from "@/components/layouts/Navbar";
import { MovieItem } from "@/types";
import { currentUser } from "@clerk/nextjs";

const gotgData = {
  id: 9,
  title: "Guardians of the Galaxy Vol. 3",
  description:
    "Peter Quill masih trauma karena kehilangan Gamora. Ia perlu mengumpulkan timnya untuk melindungi alam semesta dan salah satu anggota mereka. Jika mereka gagal, Guardian akan berakhir.",
  release_date: "2023-05-03",
  poster_url: "https://image.tmdb.org/t/p/w500/nAbpLidFdbbi3efFQKMPQJkaZ1r.jpg",
  age_rating: 12,
  ticket_price: 41000,
};

async function getMovies(): Promise<MovieItem[]> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const movies = await getMovies();
  const user = await currentUser();
  return (
    <main>
      <Navbar userId={user ? user.id : ""} username={user ? user.username! : ""} age={user ? user.unsafeMetadata.age as number : 0} />
      <div className="max-w-7xl m-6 gap-4 grid grid-cols-6 items-center ">
        <div className=" col-span-6 md:col-span-4 flex flex-col gap-2">
          {/* <h1 className='text-4xl font-bold raleway'>Movies at Your Fingertips.</h1> */}
          <h1 className="text-4xl md:text-6xl font-bold raleway uppercase tracking-widest ">
            Your Movie <span className="text-indigo-500">Magic</span> Experience
            Begins with <span className="text-indigo-500">Easy</span> Booking.
          </h1>
          <h3 className="raleway font-medium">
            Unleash the Cinematic Experience: Easy Booking, Memorable Movies!
          </h3>
          <a href="#movieGrid" className="btn-primary w-fit mt-4 text-lg">
            Explore Your Next Movie
          </a>
        </div>
        <div className="hidden md:flex col-span-2 items-center justify-center">
          <MovieCard movie={gotgData} />
          {/* <Link
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
          </Link> */}
        </div>
      </div>
      <div id="movieGrid" className="max-w-7xl movieGrid mx-6 flex flex-col mt-20 mb-6">
        <MovieGrid movies={movies} />
      </div>
    </main>
  );
}
