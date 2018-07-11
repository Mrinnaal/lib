import { Component, OnInit, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AtlService } from '../services/atl.service';

@Component({
  selector: 'app-track-books',
  templateUrl: './track-books.component.html',
  styleUrls: ['./track-books.component.css'],
  providers: [ AtlService ]
})
export class TrackBooksComponent implements OnInit {

  bookTrack: any;
  userTrack: any;

  constructor(private service: AtlService) { }

  ngOnInit() {
    this.service.getBooks().then(data=> {
      this.bookTrack = data;
    }).catch(errorMsg=> {
      console.log(errorMsg);
    });

    this.service.getAllUsers().then(data=>{
      this.userTrack = data;
      console.log(JSON.stringify(data));
      this.userTrack = this.userTrack.filter((data1)=>{
        if(data1.issuedBooks.length > 0){
          return data1;
        }
      });
    }).catch(errorMsg=>{
      console.log(errorMsg);
    });
  }
}
