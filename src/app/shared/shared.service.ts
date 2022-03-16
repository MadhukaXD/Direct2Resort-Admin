import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  clearNotifications(msgObj: any) {
    return this.http.post(`${environment.apiPath}/notifications/notificationsClear`, msgObj).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
