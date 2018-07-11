import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AtlService } from '../services/atl.service';

@Component({
  selector: 'app-modify-books',
  templateUrl: './modify-books.component.html',
  styleUrls: ['./modify-books.component.css'],
  providers: [ AtlService ]
})
export class ModifyBooksComponent implements OnInit {
  @Input() books;

  booksList: any;
  dropDownArray = ['NA','Fiction','Love','Social'];
  dropDownValue: any;
  edit = [];

  constructor(private service: AtlService) { }

  

  ngOnInit() {
    this.dropDownValue = 'NA';
    this.booksList = this.books;
  }

  update(book){
    const data = {
      'BookName': book.BookName,
      'AuthorName': book.AuthorName,
      'ISBN': book.ISBN,
      'Genre': book.Genre,
      'Available': book.Available
    };
    this.service.updateBooks(book.Id, data).then(data=> {
      alert('Book Details Updated');
    }).catch(errorMsg=> {
      console.log('cannot update the book');
    });
  }
}
