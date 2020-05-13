import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LotProductInterface } from "../models/lot-product.interface";
import { ReportExitInterface } from "../models/report-exit.interface";

@Injectable({
  providedIn: "root",
})
export class InquietudService {
  API;
  constructor(private http: HttpClient) {
    this.API = `${environment.basePath}/inquietud`;
  }

  entrance(lot: LotProductInterface): Observable<any> {
    return new Observable((observer) => {
      console.log(lot);
      observer.next(lot);
      observer.complete();
    });
  }

  close(lot: LotProductInterface): Observable<any> {
    return new Observable((observer) => {
      console.log(lot);
      observer.next(lot);
      observer.complete();
    });
  }

  exit(report: ReportExitInterface): Observable<any> {
    return new Observable((observer) => {
      console.log(report);
      observer.next(report);
      observer.complete();
    });
  }
}