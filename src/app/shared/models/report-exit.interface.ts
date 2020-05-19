import { LotProductInterface } from "./lot-product.interface";

export interface ReportExitInterface {
  product?: LotProductInterface;
  loteId?: string;
  productId?: number;
  date: string;
  lot?: string;
  lotInternal?: LotProductInterface;
  quantity?: number;
  observations: string;
}
