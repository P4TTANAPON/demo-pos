export interface Product {
  _id?: string;
  product_id?: number;
  image?: string;
  name: string;
  stock: number;
  price: number;
  created?: Date;
  __v?: number;
  file?: Blob;
  qty?: number;
}
