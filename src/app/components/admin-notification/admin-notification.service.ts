import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminNotificationService {

  constructor(private http: HttpClient) { }

  getNotifications() {
    return this.http.get(`${environment.apiPath}/notifications/getNotifications`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  notificationSeen(notificationId: number) {
    return this.http.post(`${environment.apiPath}/notifications/notificationSeen`, {notificationId}).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
