export type ProductPageInterface = {
  _id: string;
  _updatedAt: string;
  products: ProductItem[];
  _createdAt: string;
  _rev: string;
  _type: "productPage";
};

export interface ProductItem {
  price: number;
  _type: string;
  name: string;
  _key: string;
}
