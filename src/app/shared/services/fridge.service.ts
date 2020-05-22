import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { FridgeInterface } from "../models/fridge.interface";

@Injectable({ providedIn: "root" })
export class FridgeService {
  URL;

  constructor(private http: HttpClient) {
    this.URL = `${environment.basePathMock}`;
  }

  fridges(): Observable<FridgeInterface[]> {
    return this.http.get<FridgeInterface[]>(`${this.URL}/fridges`);
  }
}
