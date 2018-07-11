import { Component, OnInit, Input } from '@angular/core';
import { AtlService } from '../services/atl.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ AtlService ]
})
export class ProfileComponent implements OnInit {
  @Input() user;
  userObj : any;

  constructor(private service: AtlService) { }

  getBackground(){
    let style = {
      'background-image': 'url('+ this.userObj.profile +')'
    };
    return style;
  }

  ngOnInit() {
    this.service.getCurrentUser().then(data=>{
      this.userObj = data;
    }).catch(errorMsg=>{
      console.log(errorMsg);
    });
    // this.userObj = this.user;
  }

}
