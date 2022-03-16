import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductManagerService } from './product-manager.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  productList: any;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();

  selectedFilter: string;
  constructor(private productManagerService: ProductManagerService) { }

  ngOnInit() {
    this.selectedFilter = 'all';
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: true
    };

    this.getAllProducts();
  }
  
  getAllProducts() {
    this.isLoading = true;
    this.productManagerService.getAllProducts(this.selectedFilter).subscribe(
      data => {
        this.isLoading = false;
        this.productList = data.data;
        this.rerender();
      },
      () => {
        this.isLoading = false;
      }
    )
  }

  approveRejectProduct(product: any, status: number) {
    this.isLoading = true;
    this.productManagerService.updateProductStatus({status: status, 
      product_id: product.product_id, 
      product_name: product.product_name, 
      product_created_by: product.product_created_by,
      product_url: product.product_url}).subscribe(
      data => {
        this.isLoading = false;
        this.getAllProducts();       
      },
      () => {
        this.isLoading = false;
      }
    )
  }

  toggleFeaturedPrdct(productId, status) {
    this.isLoading = true;
    this.productManagerService.toggleFeaturedProduct({product_id: productId, status: status}).subscribe(
      data => {
        this.isLoading = false;
        this.getAllProducts();       
      },
      () => {
        this.isLoading = false;
      }
    )
  }

  filterUserist(filter: string) {
    this.selectedFilter = filter;
    this.getAllProducts();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
