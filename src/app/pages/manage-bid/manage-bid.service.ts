import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageBidService {

  constructor(private http: HttpClient) { }

  getlpDetailedView(lpBidId: string) {
    return this.http.get(`${environment.apiPath}/admin/getlpDetailedView/${lpBidId}`).pipe(
      map((data: any) => {
        return data.data[0];
      })
    )
  }

  updateapproveSelectLpBid(lpData: any) {
    return this.http.put(`${environment.apiPath}/admin/updateapproveSelectLpBid/`, lpData).pipe(
      map((data: any) => {
        return data.data;
      })
    )
  }
}
