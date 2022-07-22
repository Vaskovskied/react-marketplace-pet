export interface ICartItem {
  product: IProduct;
  amount: number;
  allCost: number;
}

export interface ICart {
  items: ICartItem[];
  allAmount: number;
  allCost: number;
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
