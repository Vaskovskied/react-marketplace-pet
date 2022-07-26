export interface ICartItem {
  product: IProduct;
  amount: number;
  allCost: number;
}

export interface ICart {
  items: ICartItem[];
  allAmount: number;
  allCost: number;
  isLoading: boolean;
  error: null | string;
}

export interface IStylesProps {
  styles?: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type TSortType = { id: number; title: string; header: string };

export interface ISortState {
  sortTypes: TSortType[];
  selectedSort: TSortType;
}
