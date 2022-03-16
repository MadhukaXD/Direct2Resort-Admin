import { Component, OnInit, ViewChild } from '@angular/core';
import { BidListService } from './bid-list.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  bidListSea: any;
  bidListAir: any;
  bidInfo: any;
  
  bidListSub: any;
  quoteId: string;
  isLoading: boolean;

  selectedBid: {
    lpBidId: number,
    lpCompanyName: string,
    freightType: string,
    freightTotal: number,    
    freightData: string,
    buyerId: number,
    quoteUuid: string,
    freightEta: Date
  }

  selectedBids: any;
  submitedBids: any;

  constructor(private bidListService: BidListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.submitedBids = [];
    this.selectedBids = [];
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };
    this.bidListSub = this.route.params.subscribe(params => {
      this.quoteId = params.quoteId;
      this.getBids(params.quoteId); 
    });
  }

  getBids(quoteId: string) {
    this.isLoading = true;
    this.bidListService.getlpbidviewSingle(quoteId).subscribe(
      data => {
        this.bidInfo = data.topheader[0]; 
        this.bidListSea = data.seaFrieght[0];
        this.bidListAir = data.airFrieght[0];
        this.submitedBids = data.submitedBids;
        this.isLoading = false;            
        this.rerender();
      }
    )
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

  selectBid(bid, bidType) {
    const checkIfExists = this.selectedBids.findIndex((bidEle) => bidEle.freightType === bidType);

    if(checkIfExists === -1) {
      if(this.selectedBids.length < 2) {
        let fTotal = null;
        let fData = null;
        let fEta = null;

        if(bidType === 'air') {
          fTotal = bid.airFreightTotal;
          fData = bid.air_frieght_data_json;
          fEta = bid.airEta;
        } else {
          fTotal = bid.seaFreightTotal;
          fData = bid.sea_frieght_data_json;
          fEta = bid.seaEta;
        }        

        this.selectedBid = {
          lpBidId: bid.logistic_partner_bid_id,
          freightType: bidType,
          freightTotal: fTotal,
          freightData: fData,
          lpCompanyName: bid.lpname,
          buyerId: bid.buyer_id,
          quoteUuid: bid.quote_uuid,
          freightEta: new Date(fEta)
        }
        this.selectedBids.push(this.selectedBid);              
      } 
    }       
  }

  removeFreight(bid) {
    this.selectedBids.splice(bid, 1);
  }

  submitBidToBuyer() { 
    this.isLoading = true;   
    this.bidListService.submitBidToBuyer(this.selectedBids).subscribe(
      data => {
        if(data) {
          this.loadAll();
          this.isLoading = false;
        }     
      }
    )
  }
}
