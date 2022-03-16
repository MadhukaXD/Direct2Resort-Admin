import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BuyerManagerService } from './buyer-manager.service';
import {SnotifyService} from 'ng-snotify';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserManagerModalComponent } from '../user-manager-modal/user-manager-modal.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-buyer-manager',
  templateUrl: './buyer-manager.component.html',
  styleUrls: ['./buyer-manager.component.scss']
})
export class BuyerManagerComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  buyerList: any;
  isLoading: boolean = false;
  bsModalRef: BsModalRef;
  selectedFilter: string;

  constructor(private buyerManagerService: BuyerManagerService, private snotifyService: SnotifyService, private modalService: BsModalService) { }

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
    this.buyerManagerService.getAllBuyers(this.selectedFilter).subscribe(
      data => {
        this.buyerList = data.data;
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
    this.buyerManagerService.userStatusUpdate(seller).subscribe(
      data => {
        if(data.message === 'Success'){
          this.isLoading = false;
          this.getSellers();
          this.snotifyService.success('Buyer Activated');
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
    this.buyerManagerService.userStatusUpdate(seller).subscribe(
      data => {
        if(data.message === 'Success') {          
          this.isLoading = false;
          this.getSellers();
          this.snotifyService.success('Buyer Deactivated');
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
    this.bsModalRef = this.modalService.show(UserManagerModalComponent, {initialState,  ignoreBackdropClick: true});
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
