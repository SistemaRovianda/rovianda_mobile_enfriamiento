import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LotProductInterface } from "../models/lot-product.interface";
import { ReportExitInterface } from "../models/report-exit.interface";

@Injectable({
  providedIn: "root",
})
export class MeatService {
  API;
  constructor(private http: HttpClient) {
    this.API = `${environment.basePathMock}/meat`;
  }

  exit(report: ReportExitInterface): Observable<any> {
    return this.http.post<any>(`${this.API}/exit`, report);
  }
  status(lot: LotProductInterface): Observable<any> {
    return this.http.patch<any>(`${this.API}/status`, lot);
  }
}
