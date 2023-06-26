export interface MovieItem {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: number;
  ticket_price: number;
}

export type MovieSearchBar = {
  query: string
}

export type MovieFilterAndSort = {
  id: number;
  name: string;
  value: string;
}