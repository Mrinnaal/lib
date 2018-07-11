import { Component, OnInit, Input } from '@angular/core';
import { AtlService } from '../services/atl.service';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-book-model',
  templateUrl: './book-model.component.html',
  styleUrls: ['./book-model.component.css'],
  providers: [ AtlService ]
})
export class BookModelComponent implements OnInit {
  @Input() book;
  @Input() issuedBooks;
  @Input() bookId;

  modalId: any;
  targetId: any;
  perUserBooks: any;
  issuedArray: any;
  today = new Date();
  private genre: any;
  private issuedDays: any;
  $:any;

  constructor(private service: AtlService) { }

  bookIdArray(books): void{
    this.issuedArray = [];
    if(books.length > 0){
      for(let i=0; i<books.length; i++){
        this.issuedArray.push(books[i].Id);
      }
    }
  }

  ngOnInit() {
    this.modalId = 'targetPopUp' + (this.bookId + 1);
    this.targetId = '#'+this.modalId;
    this.bookIdArray(this.issuedBooks);
    this.genre = this.book.Genre;
    this.service.getPromise().then(data=> {
      this.perUserBooks = data.numberOfBooks;
      this.issuedDays = data.numberOfDays;
    });
  }

  

  dueDate(date): any{
    const today = new Date();
    const response = today.setTime(today.getTime() + (date * 24 * 60 * 60 * 1000));
    return (new Date(response));
  }

  issueBook(book): void{
    if(this.issuedBooks.length >= this.perUserBooks || this.issuedArray.indexOf(book.Id) > -1){
      return;
    }
    else{
      const obj = {
        'Id': book.Id,
        'fromDate': this.today,
        'toDate': undefined,
        'dueDate': this.dueDate(this.issuedDays),
        'BookName': book.BookName,
        'AuthorName': book.AuthorName,
        'Rating': 0
      };
      this.service.issueBook(book.Id, obj).then(data=>{
        this.issuedBooks.push(obj);
        this.issuedArray.push(book.Id);
      }).catch(errorMsg=>{
        console.log(errorMsg);
        alert('Problem with server');
      });
    }
  }
}