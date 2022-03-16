import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {SnotifyService} from 'ng-snotify';
import { AdminUserManagerService } from './admin-user-manager.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-admin-user-manager',
  templateUrl: './admin-user-manager.component.html',
  styleUrls: ['./admin-user-manager.component.scss']
})
export class AdminUserManagerComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(ModalDirective) adminRegForm: ModalDirective;
  isLoadingForm: boolean = false;
  isLoading: boolean = false;
  adminList: any;
  adminUser: {
    fName: string,
    lName: string,
    email: string,
    password: string,
    phone: string
  }
  constructor(private modalService: BsModalService, private snotifyService: SnotifyService, private adminUserManagerService: AdminUserManagerService) {}

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };

    this.adminUser = {
      fName: '',
      lName: '',
      email: '',
      password: '',
      phone: ''
    }
    this.getAdminUsers();
  }

  addNewAdminModal() {
    this.adminRegForm.show();
  }

  getAdminUsers() {
    this.isLoading = true;
    this.adminUserManagerService.getAllAdminUsers().subscribe(
      data => {
        this.adminList = data.data;
        this.isLoading = false;
        this.rerender();
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error(err);
      }
    )
  }

  adminReg(f) {
    if(f.valid) {
      if(f.value.password === f.value.confirmPw) {
        this.isLoadingForm = true;
        this.adminUserManagerService.addNewAdmin(this.adminUser).subscribe(
          data => {
            if(data.data.insertId) {
              this.isLoadingForm = false;
              this.adminUser = {
                fName: '',
                lName: '',
                email: '',
                password: '',
                phone: ''
              }
              this.snotifyService.success('New admin created');
              this.adminRegForm.hide();
              this.getAdminUsers();
            }
          },
          (err) => {
            this.isLoadingForm = false;
            this.snotifyService.error(err.error)
          }
        )
      } else {
        this.isLoadingForm = false;
        this.snotifyService.error('Password not matching');
      }
    }
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
