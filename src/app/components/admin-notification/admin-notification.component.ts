import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNotificationService } from './admin-notification.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})
export class AdminNotificationComponent implements OnInit {
  notifications: any;
  notificationCount: number;

  constructor(private adminNotificationService: AdminNotificationService, private router: Router) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.adminNotificationService.getNotifications().subscribe(
      data => {
        this.notifications = data.notificationList;  
        this.notificationCount = data.unSeenCount;     
      },
      (error) => {
        console.log(error);        
      }
    );
  }

  notificationOnClick(notification: any) {
    if(notification.notification_type === 'QUOTE') {
      const quoteId = notification.notification_type_id;
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/page/manage-rfq/${quoteId}`]);
    } else if(notification.notification_type === 'USER_REG') {
      const userManager = notification.notification_type_id;
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/page/${userManager}`]);
    } else if(notification.notification_type === 'PRODUCT_SERIES') {
      const seriesId = notification.notification_type_id;
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/page/series-manager`]);
    } else if(notification.notification_type === 'PRODUCT') {
      const prodcutUrl = notification.notification_type_id;
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/page/product/${prodcutUrl}`]);
    } else if(notification.notification_type === 'MESSAGE') {
      const msgUuid = notification.notification_type_id;
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/page/message-box`]);
    }
  }

  notificationSeen(notificationId: number) {
    this.adminNotificationService.notificationSeen(notificationId).subscribe(
      data => {
        this.getNotifications();
      },
      (error) => {
        console.log(error);        
      }
    );
  }
}
