import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {

  constructor(private http: HttpClient) { }

  getAllProducts(filter: string) {
    return this.http.post(`${environment.apiPath}/admin/getAllProducts`, {filter}).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  updateProductStatus(obj: any) {
    return this.http.post(`${environment.apiPath}/admin/approveRejectProduct`, obj).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  toggleFeaturedProduct(featuredObj) {
    return this.http.post(`${environment.apiPath}/admin/toggleFeaturedProduct`, featuredObj).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
