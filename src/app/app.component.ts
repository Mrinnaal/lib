import { Component, OnInit } from '@angular/core';
import { AtlService } from './services/atl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AtlService ]
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private service: AtlService) {}

  ngOnInit(){
    try{
      this.service.setPromise();
      this.service.setBooks();
      this.service.setAllUsers();
    }catch(errorMsg){
      console.log(errorMsg);
    }
  }
}
