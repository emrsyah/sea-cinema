"use client";
import React, { useEffect, useState } from "react";
import Selector from "./Selector";
import MovieCard from "./MovieCard";
import { Search } from "react-feather";
import { MovieFilterAndSort, MovieItem } from "@/types";
import { ageOption, sortOption } from "@/types/data";
import { useFilteredAndSortedMovies } from "@/hooks/useFilteredAndSortedMovies";

const MovieGrid = ({ movies }: { movies: MovieItem[] }) => {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const [ageSelected, setAgeSelected] = useState<MovieFilterAndSort>(
    ageOption[0]
  );

  const [sortSelected, setSortSelected] = useState<MovieFilterAndSort>(
    sortOption[0]
  );

  const filteredAndSortedMovies = useFilteredAndSortedMovies({
    movies,
    filter_value: ageSelected.id,
    search_query: searchQuery,
    sort_option: sortSelected.id,
  });

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="p-2 w-full flex-1 border-[1.5px] border-gray-600 rounded flex gap-2">
          <Search className="w-5" />
          <input
            value={searchQuery}
            onChange={(ev)=>setSearchQuery(ev.target.value)}
            type="text"
            className="bg-transparent outline-none w-full"
            placeholder="Search movie"
          />
        </div>
        <div className="flex w-full md:w-fit items-center gap-2">
          <Selector
            option={ageOption}
            selectedOption={ageSelected}
            setSelected={setAgeSelected}
          />
          <Selector
            option={sortOption}
            selectedOption={sortSelected}
            setSelected={setSortSelected}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
        {filteredAndSortedMovies.map((movie) => (
          <MovieCard key={movie.poster_url} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
