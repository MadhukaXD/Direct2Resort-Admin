import { Component, OnInit } from '@angular/core';
import { ApprovedQuotesService } from './approved-quotes.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-approved-quotes',
  templateUrl: './approved-quotes.component.html',
  styleUrls: ['./approved-quotes.component.scss']
})
export class ApprovedQuotesComponent implements OnInit {
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  isLoading: boolean = false;
  quoteList: any;
  constructor(private approvedQuotesService: ApprovedQuotesService) { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };
    this.getQuotes();
  }

  getQuotes() {
    this.isLoading = true;
    this.approvedQuotesService.getAllQuotes().subscribe(
      data => {
        this.isLoading = false;
        this.quoteList = data.data;
        this.dtTrigger.next(this.quoteList);
      },
      () => {
        this.isLoading = false;
      }
    )
  }
}
