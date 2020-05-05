import { LotProductInterface } from "./lot-product.interface";

export interface MenuInterface {
  lots: LotProductInterface[];
  products: LotProductInterface[];
  loading: boolean;
  error: string;
}
