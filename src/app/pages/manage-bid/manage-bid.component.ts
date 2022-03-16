import { Component, OnInit } from '@angular/core';
import { ManageBidService } from './manage-bid.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-manage-bid',
  templateUrl: './manage-bid.component.html',
  styleUrls: ['./manage-bid.component.scss']
})
export class ManageBidComponent implements OnInit {
  bidListSub: any;
  bidData: any;
  airFreightData: any;
  seaFreightData:any;
  bidDataForAproval: {
    logistic_partner_bid_id: number,
    quote_uuid: string,
    ParentQuote_parent_quote_id: number
  }
  constructor(private manageBidService: ManageBidService, private route: ActivatedRoute, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.bidListSub = this.route.params.subscribe(params => {
      this.getBidData(params.lpBidId); 
    });
  }

  getBidData(lpBidId: string) {
    this.manageBidService.getlpDetailedView(lpBidId).subscribe(
      data => {
        this.bidData = data;
        this.bidDataForAproval = {
          logistic_partner_bid_id: data.logistic_partner_bid_id,
          quote_uuid: data.quote_uuid,
          ParentQuote_parent_quote_id: data.ParentQuote_parent_quote_id
        }
        this.airFreightData = JSON.parse(data.air_frieght_data_json); 
        this.seaFreightData = JSON.parse(data.sea_frieght_data_json); 
      }
    )
  }
}
