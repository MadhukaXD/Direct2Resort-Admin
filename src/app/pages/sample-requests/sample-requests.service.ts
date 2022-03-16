import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SampleRequestsService {

  constructor(private http: HttpClient) { }

  getAllSampleRequests(filter: string) {
    return this.http.post(`${environment.apiPath}/admin/getSampleRequests`, {filter}).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  shipSampleReq(reqId: string) {
    return this.http.get(`${environment.apiPath}/admin/sampleReqStatusUpdate/${reqId}`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
