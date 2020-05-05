import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LotProductInterface } from "../models/lot-product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  API;

  constructor(private http: HttpClient) {
    this.API = `${environment.basePath}/products`;
  }

  products: LotProductInterface[] = [
    {
      loteId: 4525,
      description: "producto 1 lote 1",
    },
    {
      loteId: 4525,
      description: "producto 2 lote 1",
    },
    {
      loteId: 4526,
      description: "producto 1 lote 2",
    },
    {
      loteId: 4527,
      description: "producto 1 lote 3",
    },
    {
      loteId: 4528,
      description: "producto 1 lote 4",
    },
    {
      loteId: 4528,
      description: "producto 2 lote 4",
    },
  ];

  getProducts(loteId: number): Observable<any> {
    return new Observable((observer) => {
      observer.next(
        this.products.filter((product) => {
          return product.loteId === loteId;
        })
      );
      observer.complete();
    });
  }
  getAllProductsPacking(): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.products);
      observer.complete();
    });
  }
}
