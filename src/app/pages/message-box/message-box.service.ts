import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(private http: HttpClient) { }

  getAllMsgs() {
    return this.http.get(`${environment.apiV2}/productmessage/adminGetProductMsgs`).pipe(
      map((data:any) => {
        data.forEach(msgs => { 
          msgs.formOpen = false;
        });
        return data;
      })
    )
  }

  getSingleChat(uuid: string) {
    return this.http.get(`${environment.apiV2}/productmessage/adminGetMsgInstance/${uuid}`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  approveMsg(msgId: any) {
    return this.http.post(`${environment.apiV2}/productmessage/adminApproveProdcutMsg`, msgId).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  rejectMsg(msgId: any) {
    return this.http.post(`${environment.apiV2}/productmessage/adminRejectProdcutMsg`, msgId).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  setMsgSeen(msg: any) {
    return this.http.post(`${environment.apiV2}/productmessage/setMsgSeen`, msg).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
