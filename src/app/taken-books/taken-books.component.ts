import { Component, OnInit, Input } from '@angular/core';
import { AtlService } from '../services/atl.service';
import { RatingModule } from "ngx-rating";

@Component({
  selector: 'app-taken-books',
  templateUrl: './taken-books.component.html',
  styleUrls: ['./taken-books.component.css'],
  providers: [ AtlService ]

})
export class TakenBooksComponent implements OnInit {
  @Input() book;
  @Input() issuedBooks;
  @Input() history;

  constructor(private service: AtlService) { }

  today = new Date();
  starsCount: number;

  ngOnInit() {
  }

  return(book, id){
    this.issuedBooks[id].toDate = this.today;
    this.service.returnBook(book.Id, this.issuedBooks[id]).then(response=>{
      const issuedBookId = this.issuedBooks.map(data=>{
        return data.Id;
      }).indexOf(book.Id);
      this.issuedBooks.splice(issuedBookId, 1);
      this.history.push(book);
      book.toDate = this.today;
    }).catch(errorMsg=>{
      console.log(errorMsg);
    });
  }

  rating(rating, id): void{
    this.issuedBooks[id].rating = rating;
  }

}
