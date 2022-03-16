import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUserManagerService {

  constructor(private http: HttpClient) { }

  addNewAdmin(user: any) {
    return this.http.post(`${environment.apiPath}/admin/addAdminUser`, user).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getAllAdminUsers() {
    return this.http.get(`${environment.apiPath}/admin/getAllAdminUsers`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }  
}
