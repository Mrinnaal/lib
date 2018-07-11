import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AtlService } from '../services/atl.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ AtlService ]
})
export class UserComponent implements OnInit {

  constructor(
    private service : AtlService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  sidebarContent: any;
  issuedBooks: any;
  history: any;

  user = {
    'user': undefined,
    'books': undefined,
    'promise': undefined
  };

  initData(): void {
    this.service.getBooks().then(data=>{
      this.user.books = data;
    });
    this.service.getPromise().then(data=>{
      this.user.promise = data;
    });
    this.service.getSessionData('currentUser').then(data=>{
      this.user.user = data;
      this.issuedBooks = this.user.user.issuedBooks;
      this.history = this.user.user.history;
    }).catch(errorMsg=>{
      console.log('error setting user data '+ errorMsg);
    });
  }

  ngOnInit() {
    this.initData();
    this.sidebarContent = 'profile';
  }

  setSidebarContent(contentName: string): void {
    this.sidebarContent = contentName;
  }

  logout(): void {
    sessionStorage.setItem('User', '0');
    this.router.navigate(['/login']);
  }

}
