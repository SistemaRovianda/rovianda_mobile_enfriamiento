import { LotProductInterface } from "./lot-product.interface";
import { FridgeInterface } from "./fridge.interface";
import { LotInterface } from "./lot.interface";
import { RawMaterialInterface } from "./rawMaterial.interface";

export interface MenuInterface {
  lots: LotInterface[];
  products: LotProductInterface[];
  rawMaterial: RawMaterialInterface[];
  fridges: FridgeInterface[];
  loading: boolean;
  error: string;
}
