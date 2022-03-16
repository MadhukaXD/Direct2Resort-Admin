import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductSeriesManagerService {

  constructor(private http: HttpClient) { }

  getAllProducts(filter: string) {
    return this.http.post(`${environment.apiPath}/series/getPsAdmin`, {filter}).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  rejectSeries(seriesId) {
    return this.http.put(`${environment.apiPath}/series/rejectPsAdmin`, {psId: seriesId}).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  approveSeries(seriesId) {
    return this.http.put(`${environment.apiPath}/series/approvePsAdmin`, {psId: seriesId}).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
