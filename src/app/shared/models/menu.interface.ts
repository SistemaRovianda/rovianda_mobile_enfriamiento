import { LotProductInterface } from "./lot-product.interface";
import { FridgeInterface } from "./fridge.interface";
import { LotInterface } from "./lot.interface";

export interface MenuInterface {
  lots: LotInterface[];
  products: LotProductInterface[];
  fridges: FridgeInterface[];
  loading: boolean;
  error: string;
}
