import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(books: any, value: any[]): any {
    let filteredBooks = [];
    const dropdown = value[0];
    const search = value[1];

    if (dropdown !== 'NA') {
      books.map(data => {
        if (data.Genre === dropdown) {
          filteredBooks.push(data);
        }
      });
    }
    else {
      filteredBooks = books;
    }

    if (search !== '') {
      const arrayIndex = [];
      filteredBooks = filteredBooks.filter((data, index) => {
        if (!data.AuthorName.match(search) && !data.BookName.match(search)) {
          arrayIndex.push(index);
        }
        else {
          return data;
        }
      });
    }
    return filteredBooks;
  }
}
