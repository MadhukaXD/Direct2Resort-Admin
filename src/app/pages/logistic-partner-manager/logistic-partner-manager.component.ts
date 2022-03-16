import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserManagerModalComponent } from '../user-manager-modal/user-manager-modal.component';
import { LogisticPartnerManagerService } from './logistic-partner-manager.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-logistic-partner-manager',
  templateUrl: './logistic-partner-manager.component.html',
  styleUrls: ['./logistic-partner-manager.component.scss']
})
export class LogisticPartnerManagerComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  sellerList: any;
  isLoading: boolean = false;
  bsModalRef: BsModalRef;
  selectedFilter: string;
  constructor(private logisticPartnerManagerService: LogisticPartnerManagerService, private snotifyService: SnotifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.selectedFilter = 'all';
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: true
    };
    this.getSellers();
  }

  getSellers() {
    this.isLoading = true;
    this.logisticPartnerManagerService.getAllSellers(this.selectedFilter).subscribe(
      data => {
        this.sellerList = data.data;
        this.isLoading = false;
        this.rerender();
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error(err);
      }
    )
  }

  activateUser(seller) {
    this.isLoading = true;
    seller.gen_p_ivys_admin_aproval = 'Active';
    this.logisticPartnerManagerService.userStatusUpdate(seller).subscribe(
      data => {
        if(data.message === 'Success'){          
          this.isLoading = false;
          this.getSellers();
          this.snotifyService.success('Seller Actaveted');
        }  
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error(err);
      }
    )   
  }

  deactivateUser(seller){
    this.isLoading = true;
    seller.gen_p_ivys_admin_aproval = 'Inactive';
    this.logisticPartnerManagerService.userStatusUpdate(seller).subscribe(
      data => {
        if(data.message === 'Success'){          
          this.isLoading = false;
          this.getSellers();
          this.snotifyService.success('Seller Deactivated');
        }  
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error(err);
      }
    ) 
  }

  userMoreData(user) {
    const initialState = {
      user
    };
    this.bsModalRef = this.modalService.show(UserManagerModalComponent, {initialState, ignoreBackdropClick: true});
  }

  filterUserist(filter: string) {
    this.selectedFilter = filter;
    this.getSellers();
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
