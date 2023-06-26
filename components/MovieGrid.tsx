"use client";
import React, { useEffect, useState } from "react";
import Selector from "./Selector";
import MovieCard from "./MovieCard";
import { Search } from "react-feather";
import { MovieFilterAndSort, MovieItem, MovieSearchBar } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { ageOption, sortOption } from "@/types/data";

const MovieGrid = ({ movies }: { movies: MovieItem[] }) => {
  const initMovies = movies;
  const [filteredMovies, setFilteredMovies] = useState(
    movies.sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    )
  );

  const [ageSelected, setAgeSelected] = useState<MovieFilterAndSort>(
    ageOption[0]
  );

  const [sortSelected, setSortSelected] = useState<MovieFilterAndSort>(
    sortOption[0]
  );

  const ageChangeHandler = (data: MovieFilterAndSort) => {
    if (data.id === 1) {
      setFilteredMovies(initMovies);
    } else if (data.id === 2) {
      const filteredAge = initMovies.filter((movie) => movie.age_rating < 13);
      setFilteredMovies(filteredAge);
    } else if (data.id === 3) {
      const filteredAge = initMovies.filter((movie) => movie.age_rating >= 13);
      setFilteredMovies(filteredAge);
    }
    sortChangeHandler(sortSelected)
    setAgeSelected(data);
  };

  const sortChangeHandler = (data: MovieFilterAndSort) => {
    console.log(data)
    if (data.id === 1) {
      const sortedMovie = filteredMovies.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
      setFilteredMovies(sortedMovie);
    } else if (data.id === 2) {
      const sortedMovie = filteredMovies.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
      );
      setFilteredMovies(sortedMovie);
    }
    setSortSelected(data);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MovieSearchBar>();

  const onSubmit: SubmitHandler<MovieSearchBar> = (data) => console.log(data);

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="p-2 flex-1 border-[1.5px] border-gray-600 rounded flex gap-2">
          <Search className="w-5" />
          <input
            type="text"
            className=" bg-transparent outline-none w-full"
            placeholder="Search movie"
          />
        </div>
        <div className="flex items-center gap-2">
          <Selector
            option={ageOption}
            selectedOption={ageSelected}
            setSelected={ageChangeHandler}
          />
          <Selector
            option={sortOption}
            selectedOption={sortSelected}
            setSelected={sortChangeHandler}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.poster_url} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
