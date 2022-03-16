import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogisticPartnerManagerService {

  constructor(private http: HttpClient) { }

  getAllSellers(filter: string) {
    return this.http.post(`${environment.apiPath}/admin/getAllLogistic`, {filter}).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  userStatusUpdate(user: any) {
    return this.http.post(`${environment.apiPath}/admin/userStatusUpdate`, user).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
