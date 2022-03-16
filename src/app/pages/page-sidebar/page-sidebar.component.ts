import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-sidebar',
  templateUrl: './page-sidebar.component.html',
  styleUrls: ['./page-sidebar.component.scss']
})
export class PageSidebarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  toggleMenu(e) {
    if(e.srcElement.classList.contains('nav-item')){
      if(e.srcElement.parentElement.lastElementChild.classList.contains('expanded')) {
        e.srcElement.parentElement.lastElementChild.classList.remove('expanded');
        e.srcElement.lastElementChild.style.transform = 'rotate(0deg)';
      } else {
        e.srcElement.parentElement.lastElementChild.classList.add('expanded');
        e.srcElement.lastElementChild.style.transform = 'rotate(180deg)';
      }
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  openHomePage() {
    window.open('http://dev.apium.io/ivys', "_blank");
  }
}
