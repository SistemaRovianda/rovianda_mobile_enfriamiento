import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LotProductInterface } from "../models/lot-product.interface";
import { ReportExitInterface } from "../models/report-exit.interface";
import { StatusInterface } from "../models/status.interface";
import { RawMaterialInterface } from "../models/rawMaterial.interface";

@Injectable({
  providedIn: "root",
})
export class MeatService {
  API;
  constructor(private http: HttpClient) {
    this.API = `${environment.basePath}/meat`;
  }

  exit(report: ReportExitInterface): Observable<any> {
    return this.http.post<any>(`${this.API}/exit`, report);
  }
  status(status: StatusInterface): Observable<any> {
    console.log(status);
    return this.http.patch<any>(`${this.API}/status`, status);
  }

  raw(lotId: number,fridgeId:number): Observable<RawMaterialInterface[]> {
    let httpParams:HttpParams = new HttpParams().append("fridgeId",fridgeId.toString());
    return this.http.get<RawMaterialInterface[]>(`${this.API}/raw/${lotId}`,{params:httpParams});
  }
}
