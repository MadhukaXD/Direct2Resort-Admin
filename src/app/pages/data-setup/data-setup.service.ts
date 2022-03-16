import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataSetupService {

  constructor(private http: HttpClient) { }

  addNewCategory(category: any) {
    return this.http.post(`${environment.apiPath}/admin/addCategory`, category).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
  updateCategory(category: any) {
    return this.http.put(`${environment.apiPath}/admin/updateCategory`, category).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
  deleteCategory(categoryId: string) {
    return this.http.get(`${environment.apiPath}/admin/deleteCategory/${categoryId}`,).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getAllCategories() {
    return this.http.get(`${environment.apiPath}/admin/getAllCategories`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  addSubCategory(subCategory: any) {
    return this.http.post(`${environment.apiPath}/admin/addSubCategory`, subCategory).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getAllSubCategories() {
    return this.http.get(`${environment.apiPath}/admin/getAllSubCategories`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  addCategorySpecAttr(subCategory: any) {
    return this.http.post(`${environment.apiPath}/admin/addCategorySpecAttr`, subCategory).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getAllCatAttrs() {
    return this.http.get(`${environment.apiPath}/admin/getAllCatAttrs`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
  
  getCategoryIcons() {
    return this.http.get(`${environment.apiPath}/admin/getCategoryIcons`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  imgUpload(imgObj) {   
    const payload = new FormData();
    // payload.append('imageFile', imgObj[0]);

    for(let i =0; i < imgObj.length; i++){
      payload.append("imageFile", imgObj[i], imgObj[i]['name']);
    }
    return this.http.post(`${environment.apiPath}/uploader/saveImage`, payload).pipe(
      map((data:any) => {
        return data;
      })
    )
    
  }
}
