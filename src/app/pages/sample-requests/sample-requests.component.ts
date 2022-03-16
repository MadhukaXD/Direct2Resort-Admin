import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { SnotifyService } from 'ng-snotify';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SampleRequestsService } from './sample-requests.service';

@Component({
  selector: 'app-sample-requests',
  templateUrl: './sample-requests.component.html',
  styleUrls: ['./sample-requests.component.scss']
})
export class SampleRequestsComponent implements OnInit {
  isLoading: boolean = false;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  
  selectedFilter: string;
  sampleReqData: any;

  constructor(private sampleRequestsService: SampleRequestsService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: true
    };
    this.selectedFilter = 'all';
    this.getSampleReqs(this.selectedFilter);
  }

  filterSampleRequests(filter: string) {
    this.selectedFilter = filter;
    this.getSampleReqs(this.selectedFilter);
  }

  getSampleReqs(selectedFilter) {
    this.isLoading = true;
    this.sampleRequestsService.getAllSampleRequests(selectedFilter).subscribe(
      data => {
        this.sampleReqData = data;
        this.isLoading = false;   
        this.rerender();    
      },
      (error) => {
        this.snotifyService.error('Something went wrong');
        this.isLoading = false;       
      }
    )
  }

  getProductImg(imgs) {
    const productImg = imgs.split(',')[0];
    let styles = {
      'background-image': 'url('+productImg+')'
    };    
    return styles;    
  }

  shipSample(sample: any) {
    this.isLoading = true;
    this.sampleRequestsService.shipSampleReq(sample.sample_req_id).subscribe(
      data => {
        this.isLoading = false;
        this.snotifyService.success('Sample Shipped');
        this.getSampleReqs(this.selectedFilter);             
      },
      (error) => {
        this.snotifyService.error('Something went wrong'); 
        this.isLoading = false;       
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
