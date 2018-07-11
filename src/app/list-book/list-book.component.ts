import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  @Input() book;
  @Input() issuedBooks;

  dropDownArray = ['NA','Fiction','Love','Social'];
  dropDownValue: any;
  searchValue: any;

  constructor() { }

  ngOnInit() {
    this.dropDownValue = 'NA';
  }

}
