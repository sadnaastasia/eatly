export interface Dish {
  id: number;
  name: string;
  picture: string;
  label: string;
  description: string;
  price: number;
  cooking_time: number;
  rating: number;
}

export interface Error {
  msg: string;
}
