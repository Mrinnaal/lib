import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AtlService } from '../services/atl.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ AtlService ]
})
export class AdminComponent implements OnInit {

  sidebarContent;
  users: any;
  books: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: AtlService
  ) { }

  initBooks(): void {
    this.service.getBooks().then((data) => {
      this.books = data;
    });
  }

  ngOnInit() {
    this.initBooks();
    this.sidebarContent = 'track-books';
  }

  setSidebarContent(contentName: string): void {
    this.sidebarContent = contentName;
  }

  logout(): void {
    sessionStorage.setItem('Admin', '0');
    this.router.navigate(['/login']);
  }
}
