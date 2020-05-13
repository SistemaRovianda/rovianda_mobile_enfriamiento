import { LotProductInterface } from "./lot-product.interface";

export interface ReportExitInterface {
  product: LotProductInterface;
  date: string;
  lot: string;
  lotInternal: LotProductInterface;
  quantity: number;
  observation: string;
}
