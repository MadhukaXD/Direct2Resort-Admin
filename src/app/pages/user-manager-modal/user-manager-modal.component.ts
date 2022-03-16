import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserManagerModalService } from './user-manager-modal.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-manager-modal',
  templateUrl: './user-manager-modal.component.html',
  styleUrls: ['./user-manager-modal.component.scss']
})
export class UserManagerModalComponent implements OnInit {
  user: any;
  company: any;
  imgPath: string;

  constructor(public bsModalRef: BsModalRef, private userManagerModalService: UserManagerModalService) { }

  ngOnInit() {
    this.imgPath = environment.ciDocImgPath;
    console.log(this.user);
    this.getCompanyData();
  }

  getCompanyData() {
    this.userManagerModalService.getCompany(this.user.Company_company_id).subscribe(comapny => {
      this.company = comapny;
    });
  }
}
