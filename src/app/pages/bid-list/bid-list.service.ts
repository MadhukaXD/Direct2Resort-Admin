import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidListService {

  constructor(private http: HttpClient) { }

  getlpbidviewSingle(quoteId: string) {
    return this.http.get(`${environment.apiPath}/admin/getlpbidviewSingle/${quoteId}`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  submitBidToBuyer(data: any) {
    return this.http.post(`${environment.apiPath}/admin/bidSubmit`, data).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
  
}
