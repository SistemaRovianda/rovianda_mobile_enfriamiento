import { FridgeInterface } from "./fridge.interface";

export interface MaterialInterface {
  id: number;
  rawMaterial: string;
  fridge: FridgeInterface;
}
