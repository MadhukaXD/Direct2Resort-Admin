import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SellerManagerComponent } from './seller-manager/seller-manager.component';
import { BuyerManagerComponent } from './buyer-manager/buyer-manager.component';
import { AdminUserManagerComponent } from './admin-user-manager/admin-user-manager.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { QuoteManagerComponent } from './quote-manager/quote-manager.component';
import { ManageQuoteComponent } from './manage-quote/manage-quote.component';
import { DataSetupComponent } from './data-setup/data-setup.component';
import { ApprovedQuotesComponent } from './approved-quotes/approved-quotes.component';
import { BidQoutesComponent } from './bid-qoutes/bid-qoutes.component';
import { BidListComponent } from './bid-list/bid-list.component';
import { ManageBidComponent } from './manage-bid/manage-bid.component';
import { AdminSingleProductComponent } from './admin-single-product/admin-single-product.component';
import { LogisticPartnerManagerComponent } from './logistic-partner-manager/logistic-partner-manager.component';
import { ManageRfqComponent } from './quote-manager/manage-rfq/manage-rfq.component';
import { ProductSeriesManagerComponent } from './product-series-manager/product-series-manager.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { SampleRequestsComponent } from './sample-requests/sample-requests.component';

const routes: Routes = [{
  path: 'page',
  component: PagesComponent,
  children: [
    {
      path: 'seller-manager',
      component: SellerManagerComponent
    },
    {
      path: 'buyer-manager',
      component: BuyerManagerComponent
    },
    {
      path: 'logistic-partner-manager',
      component: LogisticPartnerManagerComponent
    },
    {
      path: 'admin-user-manager',
      component: AdminUserManagerComponent
    },
    {
      path: 'product-manager',
      component: ProductManagerComponent
    },
    {
      path: 'series-manager',
      component: ProductSeriesManagerComponent
    },
    {
      path: 'product/:url',
      component: AdminSingleProductComponent
    },
    {
      path: 'quote-manager',
      component: QuoteManagerComponent
    },
    {
      path: 'approved-quotes',
      component: ApprovedQuotesComponent
    },
    {
      path: 'manage-quote/:quoteId',
      component: ManageQuoteComponent
    },
    {
      path: 'manage-rfq/:quoteId',
      component: ManageRfqComponent
    },
    {
      path: 'data-setup',
      component: DataSetupComponent
    },
    {
      path: 'bid-quotes',
      component: BidQoutesComponent
    },
    {
      path: 'bids/:quoteId',
      component: BidListComponent
    },
    {
      path: 'manage-bid/:lpBidId',
      component: ManageBidComponent
    },
    {
      path: 'message-box',
      component: MessageBoxComponent
    },
    {
      path: 'sample-requests',
      component: SampleRequestsComponent
    }
  ]
} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
