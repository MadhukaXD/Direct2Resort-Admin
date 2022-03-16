import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ManageQuoteService {

  constructor(private http: HttpClient) { }

  getQuote(quoteId: number) {
    return this.http.get(`${environment.apiPath}/admin/getQuoteById/${quoteId}`).pipe(
      map((data:any) => {
        return data.data[0];
      })
    )
  }

  getQuoteProduct(quoteId: number) {
    return this.http.get(`${environment.apiPath}/quote/getQuoteProductDetailsSeller/${quoteId}`).pipe(
      map((data:any) => {
        const productSingleImg = data.data[0].product_imgs.split(',')[0];
        data.data[0].product_single_img = productSingleImg;
        return data.data[0];
      })
    )
  }

  getQuoteInstanceDetails(quoteId: number) {
    return this.http.get(`${environment.apiPath}/admin/getAllQuoteInstances/${quoteId}`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }


  getLastQuoteInstanceId(quoteId: number) {
    return this.http.get(`${environment.apiPath}/quote/getLastQuoteInstanceId/${quoteId}`).pipe(
      map((data:any) => {
        return data.data[0];
      })
    )
  }

  approveQuoteInstance(quoteInstanceId, productId) {
    return this.http.put(`${environment.apiPath}/admin/updateAdminQuoteInstanceApproval`, {quote_instance_id: quoteInstanceId, product_id: productId}).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  approveBuyerMsg(quoteInstanceId) {    
    return this.http.put(`${environment.apiPath}/admin/updateAdminQuoteInstanceApprovalBuyer`, {quote_instance_id: quoteInstanceId}).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  getMarkupPricesInfo(quoteInstanceId, productId) {
    return this.http.get(`${environment.apiPath}/admin/getMarkupPricesInfo/${quoteInstanceId}/${productId}`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  getProductQuoteInstancebyQuote(productQuoteId) {
    return this.http.get(`${environment.apiPath}/series/getProductQuoteInstancebyQuote/${productQuoteId}`).pipe(
      map((data: any) => {
        return data.data;
      })
    )
  }
}
