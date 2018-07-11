import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AtlService } from '../services/atl.service';

@Component({
  selector: 'app-limit-books',
  templateUrl: './limit-books.component.html',
  styleUrls: ['./limit-books.component.css'],
  providers: [ AtlService ]
})
export class LimitBooksComponent implements OnInit {

  constructor(private service: AtlService) { }

  data = {
    'noOfBooks' : undefined,
    'noOfDays' : undefined
  };

  ngOnInit() {
    this.service.getPromise().then((data)=> {
      this.data.noOfBooks = data.numberOfBooks;
      this.data.noOfDays = data.numberOfDays;
    }).catch(errorMsg=> {
      console.log('error getting promise');
    });
  }

  updatePromise(data): void{
    this.service.updatePromise(data).then((response)=> {
      alert(response);
    }).catch(errorMsg=> {
      console.log('error updating promise');
    });
  }
}
