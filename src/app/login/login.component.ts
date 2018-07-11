import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AtlService } from '../services/atl.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [ AtlService ]
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private authentication : AuthenticationService,
    private service : AtlService
  ) { }

  ngOnInit() {
  }

  login() : void{
    this.authentication.login(this.username,this.password).then(response => {
      if(response.accessType === 'Admin'){
        sessionStorage.setItem('Admin','1');
        sessionStorage.setItem('User','0');
        this.router.navigate(['/admin']);
      }
      else if(response.accessType === 'User'){
        sessionStorage.setItem('Admin','0');
        sessionStorage.setItem('User','1');
        this.service.setCurrentUser(response.arrayNo);
        this.router.navigate(['/user']);
      }
    }).catch(errorMsg => {
      alert('Please enter correct username and password');
      console.log(errorMsg);
    });
  }
}
