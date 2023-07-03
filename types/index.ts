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
  query: string;
};

export type MovieFilterAndSort = {
  id: number;
  name: string;
  value: string;
};

export type FormLoginType = {
  username: string;
  password: string;
};

export type FormSignUpType = {
  username: string;
  password: string;
  passwordConfirmation: string;
  age: number;
};

export type SeatType = {
  id: number;
  status: "available" | "taken" | "selected";
};

export type TicketCheckoutType = {
  seat: number[];
  date: string;
};
