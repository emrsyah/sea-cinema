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

export type TicketType = {
  id: number;
  movieName: string;
  userId: string;
  amount: number;
  price: number;
  seat: number[];
  playDate: Date;
  status: "success" | "failed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewType = {
  id: number;
  userId: string;
  username: string;
  movieName: string;
  rating: number;
  review: string;
  updatedAt: Date;
  createdAt: Date;
};

export type PickedReviewType = Pick<ReviewType, "id" | "review" | "rating">;


export interface TicketWithReviewType extends TicketType {
  review?: ReviewType;
}

export type RequiredTicketParamsType = Pick<
  TicketType,
  "movieName" | "userId" | "amount" | "price" | "seat" | "playDate"
>;

export type InputReviewType = {
  userId: string;
  username: string;
  movieName: string;
  review: string;
  rating: number;
};
