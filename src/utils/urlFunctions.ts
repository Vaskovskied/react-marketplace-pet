export const getAllProdcutsByCategory = (category: string): string => {
  return `https://fakestoreapi.com/products/category/${category}`;
};

export const getProductById = (productId: number) => {
  return `https://fakestoreapi.com/products/${productId}`;
};
