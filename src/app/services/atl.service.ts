import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { setPromise, getPromise, updatePromise } from './promise-configuration.service'
import 'rxjs/add/operator/map';

@Injectable()
export class AtlService {

  constructor(private http: HttpClient) { }
  // private promiseConfig : PromiseConfigurationService;

  //session Storage and Updating session value
  getSessionData(key): Promise<any> {
    try {
      const data = sessionStorage.getItem(key);
      return Promise.resolve(JSON.parse(data));
    } catch (errorMsg) {
      return Promise.reject('fetching data failed' + errorMsg);
    }
  }
  
  updateSessionData(key, value): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  //promise
  getPromise(): Promise<any>{
    return getPromise();
  }

  setPromise(): void {
    setPromise(this.http);
  }

  updatePromise(data): Promise<any>{
    return updatePromise(data);
  }

  //setting and getting user in session storage
  getAllUsers(): Promise<any> {
    try {
      const data = sessionStorage.getItem('allUsers');
      return Promise.resolve(JSON.parse(data));
    } catch (errorMsg) {
      return Promise.reject('session data getting allUsers failed');
    }
  }

  setAllUsers(): void {
    this.http.get('../../assets/userList.json').subscribe(
      response => { 
        sessionStorage.setItem('allUsers', JSON.stringify(response)); 
      },
      errorMsg => { 
        console.log('session data setting allUsers failed'); 
      });
  }

  //setting and getting current user in session storage
  setCurrentUser(id): void {
    this.getAllUsers().then((data) => {
      const currentUser = data[id];
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }).catch((errorMsg) => {
      console.log('session data setting currentUser failed');
      this.setAllUsers();
      this.setCurrentUser(id);
    });
  }

  getCurrentUser(): Promise<any> {
    try {
      const data = sessionStorage.getItem('currentUser');
      return Promise.resolve(JSON.parse(data));
    }catch (errorMsg) {
      return Promise.reject('session data getting currentUser failed');
    }
  }

  //get set and update for books
  setBooks(): void {
    this.http.get('../../assets/books.json')
      .subscribe(
      response => { 
        sessionStorage.setItem('books', JSON.stringify(response)); 
      },
      errorMsg => { 
        console.log('session data setting books failed'); 
      });
  }

  getBooks(): Promise<any> {
    try {
      const data = sessionStorage.getItem('books');
      return Promise.resolve(JSON.parse(data));
    } catch (errorMsg) {
      return Promise.reject('error, while fetching bookInLibrary');
    }
  }

  updateBooks(bookId, bookData): any {
    try {
      const books = JSON.parse(sessionStorage.getItem('books'));
      const id = books.map(data => {
        return data.Id;
      }).indexOf(bookId);
      books[id].BookName = bookData.BookName;
      books[id].AuthorName = bookData.AuthorName;
      books[id].ISBN = bookData.ISBN;
      books[id].Genre = bookData.Genre;
      books[id].Available = bookData.Available;
      sessionStorage.setItem('books', JSON.stringify(books));
      return Promise.resolve('Book is updated');
    } catch (errorMsg) {
      return Promise.reject('book not found');
    }
  }


  addBook(bookData): any {
    try{
      bookData.Taken = 0;
      bookData.TakenBy = [];
      this.getBooks().then(data=>{
      data.push(bookData);
      this.updateSessionData('books', data);
    });
    return Promise.resolve('book successfully added');
    } catch (errorMsg) {
      return Promise.resolve('adding book failed');
    }
  }


  //book issue
  issueBook(id, obj): Promise<any> {
    try {
      const bookObj = {
        'user': undefined,
        'fromDate': obj.fromDate,
        'toDate': undefined,
        'dueDate': obj.dueDate
      };
      this.getCurrentUser().then(user => {
        user.issuedBooks.push(obj);
        this.updateSessionData('currentUser', user);

        const allUsers = JSON.parse(sessionStorage.getItem('allUsers'));
        const userId = allUsers.map((data) => {
          return data.userId;
        }).indexOf(user.userId);
        allUsers[userId].issuedBooks.push(obj);
        this.updateSessionData('allUsers', allUsers);

        bookObj.user = user.email;

        const allBooks = JSON.parse(sessionStorage.getItem('books'));
        const bookId = allBooks.map((data) => {
          return data.Id;
        }).indexOf(id);
        allBooks[bookId].TakenBy.push(bookObj);
        allBooks[bookId].Taken = allBooks[bookId].TakenBy.length;
        this.updateSessionData('books', allBooks);
      });
      return Promise.resolve('Book is issued');
    } catch (errorMsg) {
      return Promise.resolve('Problem in server');
    }
  }

  //book return
  returnBook(id, obj): Promise<any> {
    try {
      this.getCurrentUser().then(user => {
        const book = user.issuedBooks.map((data) => {
          return data.id;
        }).indexOf(id);
        user.history.push(obj);

        const allUsers = JSON.parse(sessionStorage.getItem('allUsers'));
        const userId = allUsers.map((data) => {
          return data.userId;
        }).indexOf(user.userId);
        allUsers[userId].history.push(obj);

        const allBooks = JSON.parse(sessionStorage.getItem('books'));
        const bookId = allBooks.map((data) => {
          return data.Id;
        }).indexOf(id);
        const specificUser = allBooks[bookId].TakenBy.map(data => {
          return data.user;
        }).indexOf(user.email);

        user.issuedBooks.splice(book, 1);
        this.updateSessionData('currentUser', user);

        allUsers[userId].issuedBooks.splice(book, 1);
        this.updateSessionData('allUsers', allUsers);

        allBooks[bookId].TakenBy.splice(specificUser, 1);
        allBooks[bookId].Taken = allBooks[bookId].TakenBy.length;
        this.updateSessionData('books', allBooks);
      });
      return Promise.resolve('Book is returned');
    } catch (errorMsg) {
      return Promise.resolve('Problem with Server');
    }
  }
}
