import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageBoxService } from './message-box.service';
import { LoginService } from 'src/app/auth/login.service';
import * as jwt_decode from 'jwt-decode';
import { SnotifyService, SnotifyToast } from 'ng-snotify';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  isLoading: boolean = false;
  msgList: any;
  msgTread:  any;
  sellerCompanyId: any;
  editMsg: string;

  @ViewChild('scrollMsgFeed') private scrollMsgFeed: ElementRef;
  
  constructor(private messageBoxService: MessageBoxService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.getAllMsgs();
  }

  getAllMsgs() {
    this.isLoading = true;
    this.messageBoxService.getAllMsgs().subscribe(
      data => {
        this.isLoading = false;
        this.msgList = data;
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  getSignleMsg(msg) {
    this.isLoading = true;
    this.messageBoxService.getSingleChat(msg.uuid).subscribe(
      data => {
        this.isLoading = false;
        this.msgTread = data;  
        
        setTimeout(() => {
          this.msgFeedScrollToBottom();
        }, 100);

        this.messageBoxService.setMsgSeen({msgUuid: msg.uuid}).subscribe(
          data => {
            console.log('Message Seen');            
          }
        );      
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  approve(msg, type) {
    this.isLoading = true;     
    this.messageBoxService.approveMsg({msgUuid: msg.ProductMsgUuid, msgInstanceUuid: msg.uuid, msgFrom: msg.msgFrom, approvalType: type, editMsg: this.editMsg}).subscribe(
      data => {
        if(data) {
          this.snotifyService.success('Message approved');
          this.getSignleMsg({uuid: msg.ProductMsgUuid});
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong');
      }
    )
  }

  reject(msg) {
    this.snotifyService.prompt('Reject message with a comment', '', {
      position: 'centerCenter',
      backdrop: 0.6,
      buttons: [
        {text: 'Ok', action: (toast: SnotifyToast) => {
          if (!toast.value) {
            toast.valid = false;
            return false;
          } else {
            toast.valid = true; // default value
            this.messageBoxService.rejectMsg({msgUuid: msg.ProductMsgUuid, msgInstanceUuid: msg.uuid, msgFrom: msg.msgFrom, rejectMsg: toast.value}).subscribe(data => {              
              this.snotifyService.remove(toast.id);
              this.getSignleMsg({uuid: msg.ProductMsgUuid});
            });            
          }
        }, bold: true },
        {text: 'Cancel', action: (toast: SnotifyToast) => {
          this.snotifyService.remove(toast.id) // default
        }},
      ],
      placeholder: 'Please enter a reject note '
    });
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');        
    return {
      backgroundImage: `url(${firstImg[0]})`
    };
  }

  msgFeedScrollToBottom(): void {
    try {
        this.scrollMsgFeed.nativeElement.scrollTop = this.scrollMsgFeed.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  openEditForm(msg: any) {    
    if(msg.formOpen) {
      this.editMsg = "";
      msg.formOpen = false;
    } else {
      this.editMsg = msg.messageContent;
      msg.formOpen = true;
    }
  }
}
