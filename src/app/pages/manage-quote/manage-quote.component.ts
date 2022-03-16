import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageQuoteService } from './manage-quote.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-quote',
  templateUrl: './manage-quote.component.html',
  styleUrls: ['./manage-quote.component.scss']
})
export class ManageQuoteComponent implements OnInit, OnDestroy {
  isLoadingGetQuotes: boolean = false;
  isLoadingGetQuotesInstance: boolean = false;
  isLoadingGetProduct: boolean = false;
  isLoadingMarkupPrices: boolean = false;
  isLoadingApproveQuote: boolean = false;
  isLoadingApproveBuyerMsg: boolean = false;
  
  quoteInfo: any;
  quoteSub: any;
 
  quoteInstance: any;
 
  quoteProduct: {
    product_id: string,
    product_name: string,
    quantity: string,
    product_imgs: string,
    product_single_img: string
  };
  imgUploadPath: string;
  qiId: string;

  lastQuoteInstance: any;
  markupPrices: any;

  constructor(private manageQuoteService: ManageQuoteService, private route: ActivatedRoute, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.quoteInfo = {
      quote_id: ''
    }
    this.quoteProduct = {
      product_id: '',
      product_name: '',
      quantity: '',
      product_imgs: '',
      product_single_img: ''
    }
    this.imgUploadPath = environment.uploadedImgPath;
    this.loadAll();    
  }

  loadAll() {
    this.quoteSub = this.route.params.subscribe(params => {
      this.getLastQId(params.quoteId);
      this.getQuote(params.quoteId);
      this.getQuoteInstance(params.quoteId);
      this.getProduct(params.quoteId); 
      
      this.getProductQuoteInstance(params.quoteId);
    });
  }

  getQuote(quoteId){
    this.isLoadingGetQuotes = true;
    this.manageQuoteService.getQuote(quoteId).subscribe(
      data => {
        this.quoteInfo = data;
        this.isLoadingGetQuotes = false;
      }
    )
  }

  getQuoteInstance(quoteId){
    this.isLoadingGetQuotesInstance = true;
    this.manageQuoteService.getQuoteInstanceDetails(quoteId).subscribe(
      data => {
        this.quoteInstance = data;
        this.lastQuoteInstance = data[data.length - 1];
        
        this.getMarkupPrices(this.lastQuoteInstance.quote_instance_id);
        
        this.isLoadingGetQuotesInstance = false; 
      }
    )
  }

  getProduct(quoteId: number) {
    this.isLoadingGetProduct = true;
    this.manageQuoteService.getQuoteProduct(quoteId).subscribe(
      data => {
        this.quoteProduct = data;
        this.isLoadingGetProduct = false;
        console.log(this.quoteProduct);
        
      }
    )
  }

  getLastQId(quoteId: number) {
    this.manageQuoteService.getLastQuoteInstanceId(quoteId).subscribe(qiId => this.qiId = qiId.quote_instance_id);
  }

  approveQuoteIn(quoteInstance) {
    this.isLoadingApproveQuote = true;
    this.manageQuoteService.approveQuoteInstance(quoteInstance.quote_instance_id, this.quoteProduct.product_id).subscribe(
      data => {
        console.log(data);  
        this.isLoadingApproveQuote = false;
        this.loadAll();     
      }
    )
  }

  approveBuyerMsg(quoteInstance) {  
    this.isLoadingApproveBuyerMsg = true;      
    this.manageQuoteService.approveBuyerMsg(quoteInstance.quote_instance_id).subscribe(
      data => {
        console.log(data);    
        this.isLoadingApproveBuyerMsg = false; 
        this.loadAll();    
      }
    )
  }

  getMarkupPrices(quoteInstance) {
    this.isLoadingMarkupPrices = true;
    this.manageQuoteService.getMarkupPricesInfo(quoteInstance, this.quoteProduct.product_id).subscribe(
      data => {
        this.markupPrices = data.data;
        this.isLoadingMarkupPrices = false;  
      }
    )
  }

  ngOnDestroy() {
    this.quoteSub.unsubscribe();
  }

  getProductQuoteInstance(quoteId) {
    this.manageQuoteService.getProductQuoteInstancebyQuote(quoteId).subscribe(
      quoteInstance => {
        console.log(quoteInstance);        
      }
    )
  }
}
