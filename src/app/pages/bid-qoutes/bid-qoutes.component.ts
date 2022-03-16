import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BidQoutesService } from './bid-qoutes.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-bid-qoutes',
  templateUrl: './bid-qoutes.component.html',
  styleUrls: ['./bid-qoutes.component.scss']
})
export class BidQoutesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  bidQuoteList: any;
  isLoading: any;
  constructor(private bidQoutesService: BidQoutesService) { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };
    this.getlpbidlist();
  }

  getlpbidlist() {
    this.isLoading = true;
    this.bidQoutesService.getlpbidlist().subscribe(
      data => {
        this.bidQuoteList = data;
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
}
