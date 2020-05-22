import { LotProductInterface } from "./lot-product.interface";

export interface ReportExitInterface {
  loteId?: string;
  productId?: number;
  date: string;
  observations: string;
}
