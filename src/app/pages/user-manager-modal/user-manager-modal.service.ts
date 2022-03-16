import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagerModalService {

  constructor(private http: HttpClient) { }

  getCompany(companyId) {
    return this.http.get(`${environment.apiPath}/admin/getCompanyByUser/${companyId}`).pipe(
      map((data: any) => {
        return data[0];
      })
    )
  }
}
