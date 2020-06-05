import { LotProductInterface } from "./lot-product.interface";

export interface ReportExitInterface {
  loteId?: string;
  observations: string;
  date: string;
  quantity?: number;
  materialId?: number;
}
