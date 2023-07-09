export interface IUser {
  id: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  accessToken?: String;
  role?: string;

}

export interface LoginUserParams {
  email: string;
  password: string;
}


export interface AllData {
  product: [];
  accordian: [];
  searchresults :[];
  selectresults: [];
}

export interface FilteredData {
  [x: string]: string | number
  color: string
  style: string
  size: string
  gender: string
  price: string
  cartImg: string;
  imgUrl:string;
  name: string;
  prodId:number;
  _id: string;
}

export interface NewProductsData {
  product: [];
  accordian: [];
  searchresults :[];
}

export interface Product{
    all?:string;
    cartImg: string;
    color: string;
    gender: string;
    imgUrl:string;
    likes?: number;
    name: string;
    price: string
    prodId:number;
    qty?: string;
    size: string;
    style:string;
    text?:string | undefined | null ;
    _id: string;
}
