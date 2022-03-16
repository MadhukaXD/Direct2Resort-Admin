import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSingleProductService } from './admin-single-product.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-single-product',
  templateUrl: './admin-single-product.component.html',
  styleUrls: ['./admin-single-product.component.scss']
})
export class AdminSingleProductComponent implements OnInit {

  isLoading: boolean = false;  
  productUrlSub: any;
  product: {
    productInfo: any,
    customTabs: any,
    productSpecAttr: any,
    variants: any,
    relatedProducts: any
  };
  productImgs: any;
  imgPath: string;
  isLoggedIn: boolean;

  config = {
    animated: true,
    initialState: {},
    ignoreBackdropClick: true, 
    class: ''
  };

  relatedProducts: any;

  productCountry: string;

  constructor( private route: ActivatedRoute, private adminSingleProductService: AdminSingleProductService, private router: Router,
    private location: Location) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    
    this.imgPath = environment.uploadedImgPath;
    
    this.productImgs = [];
    this.product = {
      productInfo: {},
      customTabs: [],
      productSpecAttr: {},
      variants: {},
      relatedProducts: {}
    }

    this.productUrlSub = this.route.params.subscribe(params => {
      this.productImgs = [];
      this.product = {
        productInfo: {},
        customTabs: [],
        productSpecAttr: {},
        variants: {},
        relatedProducts: {}
      }

      this.getProduct(params.url);
    });
  }

  getProduct(url: string) {
    this.isLoading = true;
    this.adminSingleProductService.getProductByUrl(url).subscribe(
      product => {
        this.product.productInfo = product.product[0];
        this.product.customTabs = product.customTabs;
        this.product.productSpecAttr = product.productSpecAttr;
        this.product.variants = product.variants;
        this.product.relatedProducts = product.relatedProducts;        
        this.productImgGetter(product.product[0].product_imgs);
        this.getCountryName(product.product[0].country);
        this.isLoading = false;        
      }
    )
  }

  ngOnDestroy() {
    this.productUrlSub.unsubscribe();
  }
  
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
  slideConfigNav = {"slidesToShow": 5, "slidesToScroll": 1, "asNavFor": '.carousel', "focusOnSelect": true};

  productImgGetter(imgString) {
    let imgList = imgString.split(",");
    if(imgList.length > 1) {
      imgList.forEach(img => {
        this.productImgs.push({img: `${img}`});
      });
    } else {
      this.productImgs.push({img: `${imgString}`});
    }    
  }

  approveRejectProduct(product: any, status: number) {
    console.log(product);
    
    this.isLoading = true;
    this.adminSingleProductService.updateProductStatus({status: status, 
      product_id: product.product_id, 
      product_url: product.product_url,
      product_created_by: product.product_created_by,
      product_name: product.product_name}).subscribe(
      data => {
        this.isLoading = false;
        this.loadAll();
      },
      () => {
        this.isLoading = false;
      }
    )
  }

  getCountryName(countryCode: string) {
    this.adminSingleProductService.getCountryList(countryCode).subscribe(
      country => {
        this.productCountry = country;
      }
    )
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');    
    return {
      backgroundImage: `url(${firstImg[0]})`
    };
  }

  goBack() {
    this.location.back();
  }
}
