import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteManagerService {

  constructor(private http: HttpClient) { }

  getQuoteQuoteInstancesNotApproved(filter: string) {
    return this.http.post(`${environment.apiPath}/series/getQuoteQuoteInstancesNotApproved`, {filter}).pipe(
      map((data: any) => {
        return data.data;
      })
    )
  }
}
