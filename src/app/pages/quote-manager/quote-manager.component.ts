import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { QuoteManagerService } from './quote-manager.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-quote-manager',
  templateUrl: './quote-manager.component.html',
  styleUrls: ['./quote-manager.component.scss']
})
export class QuoteManagerComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  isLoading: boolean = false;
  quoteList: any;

  quoteListSeries: any;
  selectedFilter: string; 
  constructor(private quoteManagerService: QuoteManagerService) { }

  ngOnInit() {
    this.selectedFilter = 'all';
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: true
    };
    this.getQuoteQuoteInstances();
  }

  getQuoteQuoteInstances() { 
    this.isLoading = true;
    this.quoteManagerService.getQuoteQuoteInstancesNotApproved(this.selectedFilter).subscribe(
      quotes => {
        this.isLoading = false;
        this.quoteListSeries = quotes;
        this.rerender();
      },
      (err) => {
        this.isLoading = false;
      }
    )
  }

  filterUserist(filter: string) {
    this.selectedFilter = filter;
    this.getQuoteQuoteInstances();
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
