import { Component, OnInit, ViewChild } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataSetupService } from './data-setup.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-setup',
  templateUrl: './data-setup.component.html',
  styleUrls: ['./data-setup.component.scss']
})
export class DataSetupComponent implements OnInit {
  @ViewChild('newCategoryModal') newCategoryModal: ModalDirective;
  @ViewChild('newSubCategoryModal') newSubCategoryModal: ModalDirective;
  @ViewChild('newCatSpecAttrModal') newCatSpecAttrModal: ModalDirective;
  
  isLoadingCatForm: boolean = false;
  isLoadingCategoryList: boolean = false;
  isLoadingSubCategory: boolean = false;
  isLoadingSubCategoryList: boolean = false;
  isLoadingCatSpecAttr: boolean = false;
  isLoadingCatSpecAttrList: boolean = false;

  categoryObj: {
    product_cat_id: number,
    product_cat_name: string,
    product_cat_desc: string,
    product_cat_img: string
  }

  categoryList: any;
  selectedCategoryId: number;

  subCategoryObj: {
    sub_prod_cat_name: string,
    sub_prod_cat_desc: string,
    ProductCategories_product_cat_id: number
  }
  subCategoryList: any;

  catSpecAttrObj: {
    cat_spec_name: string,
    prod_cat: number,
    sub_prod_cat: number,
  }
  catSpecAttrsList: any;

  catIcons: any;
  iconPath: string;

  constructor(private dataSetupService: DataSetupService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.iconPath = environment.catIconImgPath;
    this.categoryObj = {
      product_cat_id: 0,
      product_cat_name: '',
      product_cat_desc: '',
      product_cat_img: ''
    }
    this.subCategoryObj = {
      sub_prod_cat_name: '',
      sub_prod_cat_desc: '',
      ProductCategories_product_cat_id: 0
    }
    this.catSpecAttrObj = {
      cat_spec_name: '',
      prod_cat: 0,
      sub_prod_cat: 0,
    }
    this.getCatIcons();
    this.getCategories();
    this.getSubCategories();
    this.getCatSpecAttrs();
  }

  getCategories() {
    this.isLoadingCategoryList = true;
    this.dataSetupService.getAllCategories().subscribe(
      data => {
        this.categoryList = data.data;
        this.isLoadingCategoryList = false;
      },
      (err) => {
        this.isLoadingCategoryList = false;
        this.snotifyService.error(err);
      }
    )
  }

  addCategoryModalOpen() {
    this.categoryObj = {
      product_cat_id: 0,
      product_cat_name: '',
      product_cat_desc: '',
      product_cat_img: ''
    }
    this.newCategoryModal.show();
  }

  addNewCategory(f) {
    if(f.valid) {
      this.isLoadingCatForm = true;

      if(this.categoryObj.product_cat_id === 0) {
        this.dataSetupService.addNewCategory(this.categoryObj).subscribe(
          data => {
            if(data.data.insertId) {
              this.isLoadingCatForm = false;
              this.categoryObj = {
                product_cat_id: 0,
                product_cat_name: '',
                product_cat_desc: '',
                product_cat_img: ''
              }
              this.snotifyService.success('New Category Created');
              this.newCategoryModal.hide();
              this.getCategories();
            }
          },
          (err) => {
            this.isLoadingCatForm = false;
            this.snotifyService.error(err.error)
          }
        )
      } else {
        this.dataSetupService.updateCategory(this.categoryObj).subscribe(
          data => {
            if(data.data.affectedRows) {
              this.isLoadingCatForm = false;
              this.categoryObj = {
                product_cat_id: 0,
                product_cat_name: '',
                product_cat_desc: '',
                product_cat_img: ''
              }
              this.snotifyService.success('Category Updated');
              this.newCategoryModal.hide();
              this.getCategories();
            }
          },
          (err) => {
            this.isLoadingCatForm = false;
            this.snotifyService.error(err.error)
          }
        )
      }     
    }
  }

  addSubCategoryModalOpen(category) {
    this.subCategoryObj.ProductCategories_product_cat_id = category.product_cat_id;
    this.newSubCategoryModal.show();
  }
  
  addNewSubCategory(f) {    
    console.log(this.subCategoryObj);
    
    if(f.valid) {
      this.isLoadingSubCategory = true;
      this.dataSetupService.addSubCategory(this.subCategoryObj).subscribe(
        data => {
          if(data.data.insertId) {
            this.isLoadingSubCategory = false;
            this.subCategoryObj = {
              sub_prod_cat_name: '',
              sub_prod_cat_desc: '',
              ProductCategories_product_cat_id: 0
            }
            this.snotifyService.success('New Sub Category Created');
            this.newSubCategoryModal.hide();
            this.getSubCategories();
          }
        },
        (err) => {
          this.isLoadingSubCategory = false;
          this.snotifyService.error(err.error)
        }
      )
    }
  }

  addCatSpecAttr(f) {
    if(f.valid) {
      this.isLoadingCatSpecAttr = true;
      this.dataSetupService.addCategorySpecAttr(this.catSpecAttrObj).subscribe(
        data => {
          if(data.data.insertId) {
            this.isLoadingCatSpecAttr = false;
            this.catSpecAttrObj = {
              cat_spec_name: '',
              prod_cat: 0,
              sub_prod_cat: 0,
            }
            this.snotifyService.success('Category Attribute Added');
            this.newCatSpecAttrModal.hide();
            this.getCatSpecAttrs();
          }
        },
        (err) => {
          this.isLoadingCatSpecAttr = false;
          this.snotifyService.error(err.error);
        }
      )
    }
  }

  catSpectAttrModalOpen(subProdCat) {    
    this.catSpecAttrObj.prod_cat = subProdCat.ProductCategories_product_cat_id;
    this.catSpecAttrObj.sub_prod_cat = subProdCat.sub_prod_cat_id;
    
    this.newCatSpecAttrModal.show();
  }

  getSubCategories() {
    this.isLoadingSubCategoryList = true;
    this.dataSetupService.getAllSubCategories().subscribe(
      data => {
        this.subCategoryList = data.data;
        this.isLoadingSubCategoryList = false;
      },
      (err) => {
        this.isLoadingSubCategoryList = false;
        this.snotifyService.error(err);
      }
    )
  }

  getCatSpecAttrs() {
    this.isLoadingCatSpecAttrList = true;
    this.dataSetupService.getAllCatAttrs().subscribe(
      data => {
        this.catSpecAttrsList = data.data;
        this.isLoadingCatSpecAttrList = false;
      },
      (err) => {
        this.isLoadingCatSpecAttrList = false;
        this.snotifyService.error(err);
      }
    )
  }
   
  getCatIcons() {
    this.dataSetupService.getCategoryIcons().subscribe(
      catIcons => {
        this.catIcons = catIcons;
      }
    )
  }

  editCategoryModal(category: any) {
    this.categoryObj = null;
    this.categoryObj = category;
    this.newCategoryModal.show();
  }

  deleteCategory(category: any) {
    this.isLoadingCategoryList = true;
    this.dataSetupService.deleteCategory(category.product_cat_id).subscribe(
      data => {
        if(data.data.affectedRows) {
          this.isLoadingCategoryList = false;
          this.snotifyService.success('Category Deleted');
          this.getCategories();        }
      },
      (err) => {
        this.isLoadingCategoryList = false;
        this.snotifyService.error(err.error);
      }
    )
  }
}
