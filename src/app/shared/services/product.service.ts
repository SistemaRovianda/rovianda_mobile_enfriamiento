import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LotProductInterface } from "../models/lot-product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url;

  constructor(private http: HttpClient) {
    this.url = `${environment.basePathMock}/products`;
  }

  getAllProductsFridge(): Observable<any> {
    return this.http.get<any>(`${this.url}/FRIDGE`);
  }
}
