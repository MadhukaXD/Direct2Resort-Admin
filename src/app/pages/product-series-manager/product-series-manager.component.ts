import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductSeriesManagerService } from './product-series-manager.service';
import { SnotifyService } from 'ng-snotify';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-series-manager',
  templateUrl: './product-series-manager.component.html',
  styleUrls: ['./product-series-manager.component.scss']
})
export class ProductSeriesManagerComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  productSeriesList: any;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  selectedProduct: any;

  @ViewChild(ModalDirective) seriesProductList: ModalDirective;
  selectedFilter: string;

  constructor(private productSeriesManagerService: ProductSeriesManagerService, private snotifyService: SnotifyService, private router: Router) { }

  ngOnInit() {
    this.selectedFilter = 'all';
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: true
    };

    this.getAllProductSeries();
  }

  getAllProductSeries() {
    this.isLoading = true;
    this.productSeriesManagerService.getAllProducts(this.selectedFilter).subscribe(
      data => {
        this.isLoading = false;
        this.productSeriesList = data.data;
        this.rerender();
      },
      () => {
        this.isLoading = false;
      }
    )
  }

  rejectSeries(product) {
    this.isLoading = true;
    this.productSeriesManagerService.rejectSeries(product.product_series_ref_id).subscribe(
      data => {
        if(data.status){
          this.isLoading = false;
          this.getAllProductSeries();
          this.snotifyService.success('Product Series Rejected');
        }        
      },
      (err) => {
        this.isLoading = false;
        this.getAllProductSeries();
        this.snotifyService.error('Something went wrong');        
      }
    )
  }

  approveSeries(product) {
    this.isLoading = true;
    this.productSeriesManagerService.approveSeries(product.product_series_ref_id).subscribe(
      data => {
        if(data.status){
          this.isLoading = false;
          this.getAllProductSeries();          
          this.snotifyService.success('Product Series Approved');
        }        
      },
      (err) => {
        this.isLoading = false;
        this.getAllProductSeries();
        this.snotifyService.error('Something went wrong');
        
      }
    )
  }

  openProductListModal(productList: any) {
    this.selectedProduct = productList;
    this.seriesProductList.show();
  }

  getProductSeriesBannerImg(img){   
    return {
      backgroundImage: `url(${img})`
    };
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');    
    return {
      backgroundImage: `url(${firstImg[0]})`
    };
  }

  filterUserist(filter: string) {
    this.selectedFilter = filter;
    this.getAllProductSeries();
  }

  viewProduct() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/page/product/dsdsa`])
    );
  console.log(url);
  
   // window.open(url, '_blank');
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
