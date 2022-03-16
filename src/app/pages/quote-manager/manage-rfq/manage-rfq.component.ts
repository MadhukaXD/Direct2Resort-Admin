import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ManageRfqService } from './manage-rfq.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Snotify, SnotifyService } from 'ng-snotify';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.component.html',
  styleUrls: ['./manage-rfq.component.scss']
})
export class ManageRfqComponent implements OnInit {
  isLoading: boolean = false;
  quoteSub: Subscription;
  lastQuoteInstance: any;
  fullQuoteInstance: any;
  quoteMain: any;
  
  quoteRejectMsg: string;
  msgRejectMsg: string;
  editMsg: string;

  @ViewChild('scrollMsgFeed') private scrollMsgFeed: ElementRef;

  constructor(private manageRfqService: ManageRfqService, private route: ActivatedRoute, private snotifyService: SnotifyService,
    private location: Location, private sharedService: SharedService) { }

  ngOnInit() {
    this.loadAll();
  }
 
  loadAll() {
    this.quoteSub = this.route.params.subscribe(params => {
      this.getProductQuoteInstance(params.quoteId);
      this.sharedService.clearNotifications({notification_type: 'QUOTE', typeId: params.quoteId}).subscribe(); 
    });
  }

  getProductQuoteInstance(quoteId) {
    this.isLoading = true;
    this.manageRfqService.getProductQuoteInstancebyQuote(quoteId).subscribe(
      quoteInstance => {
        this.lastQuoteInstance = quoteInstance.data.quotations[quoteInstance.data.quotations.length-1];
        this.fullQuoteInstance = quoteInstance.data.quotations;
        this.quoteMain = quoteInstance.data.quoteMain[0];
        this.isLoading = false;

        console.log(this.quoteMain);
        
        // if(this.lastQuoteInstance.quote_approved === -1) {
        //   this.quoteRejectMsg = this.lastQuoteInstance.buyer_rejected_msg;
        // }
      },
      (err) => {
        this.isLoading = false;
      }
    )
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');    
    return {
      backgroundImage: `url(${firstImg[0]})`
    };
  }

  approveMsg(msgId: number, status: string, userType: number) {
    this.isLoading = true;  
    let rejectMsg = null;
    if(status === 'Rejected') {
      rejectMsg = this.msgRejectMsg;
    }

    if(status === 'Edited') {
      rejectMsg = this.editMsg;
    }

    this.manageRfqService.adminApproveMsg(msgId, status, rejectMsg, userType, this.quoteMain.quote_uuid).subscribe(
      data => {
        this.isLoading = false;
        if(data.data.changedRows === 1) {
          this.isLoading = false;        
          this.loadAll();
          this.snotifyService.success('Message approved', '');          
        }
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong', '');
      }
    )
  }

  approveQuoteInstance(seriesInstanceId: number, msgId: number, userType: number) { 
    console.log(userType);
    
    this.isLoading = true;      
    this.manageRfqService.adminApproveSeriesInstance(seriesInstanceId, userType).subscribe(
      data => {
        if(data.data.changedRows === 1) {
          this.isLoading = false;
          this.approveMsg(msgId, 'Approved', userType); 
          this.loadAll();         
        }
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong', '');
        this.loadAll();
      }
    )
  }

  rejectQuote(qouteInstance: any) {    
    this.isLoading = true;
    this.manageRfqService.rejectQuoteInstanceQuery({
      quote_id: qouteInstance.quote_uuid,
      quoteMessage: this.quoteRejectMsg, 
      series_instance_id: qouteInstance.series_instance_id
    }).subscribe(
      data => {
        this.isLoading = false;
        this.snotifyService.success('Quote Rejected with Message', '');
        this.loadAll();
      },
      (err) => {
        this.isLoading = false;
        this.loadAll();
      }
    )
  }

  openRejectForm(qInstance, msg) {
    if(qInstance.buyer_reject === 1) {
      this.quoteRejectMsg = qInstance.buyer_rejected_msg;
    } else {
      this.quoteRejectMsg = '';
    }
    
    if(msg.rejectFormIsOpen) {
      msg.rejectFormIsOpen = false;
    } else {
      msg.rejectFormIsOpen = true;
    }
  }

  openEditForm(qInstance, msg){
    this.editMsg = msg.message_body;
    if(msg.editFormIsOpen) {
      msg.editFormIsOpen = false;
    } else {
      msg.editFormIsOpen = true;
    }
  }

  msgFeedScrollToBottom(): void {
    try {
        this.scrollMsgFeed.nativeElement.scrollTop = this.scrollMsgFeed.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  ngAfterViewChecked() {        
    this.msgFeedScrollToBottom();        
  }

  goBack() {
    this.location.back();
  }
}
