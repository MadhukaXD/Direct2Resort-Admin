import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SellerManagerComponent } from './seller-manager/seller-manager.component';
import { PagesComponent } from './pages.component';
import { PageSidebarComponent } from './page-sidebar/page-sidebar.component';
import { BuyerManagerComponent } from './buyer-manager/buyer-manager.component';
import { AdminUserManagerComponent } from './admin-user-manager/admin-user-manager.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { QuoteManagerComponent } from './quote-manager/quote-manager.component';
import { ManageQuoteComponent } from './manage-quote/manage-quote.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DataSetupComponent } from './data-setup/data-setup.component';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ApprovedQuotesComponent } from './approved-quotes/approved-quotes.component';
import { BidQoutesComponent } from './bid-qoutes/bid-qoutes.component';
import { BidListComponent } from './bid-list/bid-list.component';
import { ManageBidComponent } from './manage-bid/manage-bid.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { AdminSingleProductComponent } from './admin-single-product/admin-single-product.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DataTablesModule } from 'angular-datatables';
import { UserManagerModalComponent } from './user-manager-modal/user-manager-modal.component';
import { LogisticPartnerManagerComponent } from './logistic-partner-manager/logistic-partner-manager.component';
import { ManageRfqComponent } from './quote-manager/manage-rfq/manage-rfq.component';
import { ProductSeriesManagerComponent } from './product-series-manager/product-series-manager.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { SampleRequestsComponent } from './sample-requests/sample-requests.component';
import { AdminNotificationComponent } from '../components/admin-notification/admin-notification.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [PagesComponent, SellerManagerComponent, PageSidebarComponent, BuyerManagerComponent, AdminUserManagerComponent, ProductManagerComponent, QuoteManagerComponent, ManageQuoteComponent, DataSetupComponent, ApprovedQuotesComponent, BidQoutesComponent, BidListComponent, ManageBidComponent, AdminSingleProductComponent, UserManagerModalComponent, LogisticPartnerManagerComponent, ManageRfqComponent, ProductSeriesManagerComponent, MessageBoxComponent, SampleRequestsComponent, AdminNotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    Ng2LoadingSpinnerModule.forRoot({}),
    NgxDropzoneModule,
    AngularMyDatePickerModule,
    SlickCarouselModule,
    TabsModule.forRoot(),
    DataTablesModule,
    TooltipModule.forRoot(),
    SnotifyModule,
    PopoverModule.forRoot(),
    MomentModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  entryComponents: [
    UserManagerModalComponent
  ]
})
export class PagesModule { }
