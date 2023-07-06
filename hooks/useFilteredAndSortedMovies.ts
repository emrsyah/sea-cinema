import { MovieItem } from "@/types";

export const useFilteredAndSortedMovies = ({
  movies,
  search_query,
  filter_value,
  sort_option,
}: {
  movies: MovieItem[];
  search_query: string;
  filter_value: number;
  sort_option: number;
}) => {
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search_query.toLowerCase())
  );

  const filteredAndSortedMovies = filteredMovies.filter((movie) => {
    if (filter_value === 1) {
      return true; // Show all movies
    } else if (filter_value === 2) {
      return movie.age_rating < 13; // Show movies under 13
    } else if (filter_value === 3) {
      return movie.age_rating >= 13; // Show movies 13 and over
    }
    return true;
  });

  const sortedMovies = [...filteredAndSortedMovies].sort((a, b) => {
    if (sort_option === 1) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      ); 
    } else if (sort_option === 2) {
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      ); 
    }
    return 0;
  });

  return sortedMovies;
};
