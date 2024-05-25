export interface IUser {
  name: string;
  email: string;
  password: string;
  date: string;
  image: string;
  cartitems: [];
}
export interface LoginUserParams {
  email: string;
  password: string;
}
export interface FilteredData {
  [x: string]: string | number;
  _id: string;
  prodId: number;
  name: string;
  style: string;
  color: string;
  size: string;
  gender: string;
  imgUrl: string;
  price: number;
  cartImg: string;
  text: string;
  all: string;
  likes: number;
  qty: number;
}
export interface ProductType {
  [x: string]: string | number | string[] | undefined;
  _id: string;
  prodId: number;
  name: string;
  style: string;
  color: string;
  size: string;
  gender: string;
  imgUrl: string;
  price: number;
  cartImg: string;
  text: string;
  all: string;
  likes: number;
  qty: number;
}
export interface AccordianType {
  id: number;
  title: string | null;
  items: Array<string>;
}
export interface SearchBarType {
  id: number;
  name: string;
  options: Array<{
    id: number;
    value: string;
    displayValue: string;
  }>;
}
export interface SelectBarType {
  id: number;
  name: string;
  value: string;
  options: Array<{
    id: number;
    value: string;
    displayValue: string;
  }>;
}
export interface CartItemType {
  [x: string]: string | number | string[] | undefined;
  all: string;
  cartImg: string;
  color: string;
  gender: string;
  imgUrl: string;
  likes: number;
  name: string;
  price: number;
  prodId: number;
  qty: number;
  size: string;
  style: string;
  text: string;
  _id: string;
}
