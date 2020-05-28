import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LotInterface } from "../Models/lot.interface";

@Injectable({
  providedIn: "root",
})
export class LotsService {
  API;

  constructor(private http: HttpClient) {
    this.API = `${environment.basePath}/meat`;
  }
  getLots(id: number): Observable<LotInterface[]> {
    return this.http.get<LotInterface[]>(`${this.API}/${id}`);
  }
}
