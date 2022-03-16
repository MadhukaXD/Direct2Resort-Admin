import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovedQuotesService {

  constructor(private http: HttpClient) { }

  getAllQuotes() {
    return this.http.get(`${environment.apiPath}/admin/getQuoteApprovedAdmin`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
