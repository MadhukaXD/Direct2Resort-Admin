import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidQoutesService {

  constructor(private http: HttpClient) { }

  getlpbidlist() {
    return this.http.get(`${environment.apiPath}/admin/getlpbidlist`).pipe(
      map((data: any) => {
        return data.data;
      })
    )
  }
}
