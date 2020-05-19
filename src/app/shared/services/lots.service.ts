import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LotProductInterface } from "../models/lot-product.interface";

@Injectable({
  providedIn: "root",
})
export class LotsService {
  API;

  constructor(private http: HttpClient) {
    this.API = `${environment.basePathMock}/lots`;
  }
  getLots(status: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        type: "FRIDGE",
        status,
      },
    });
    return this.http.get<any>(`${this.API}`, { params });
  }
}
