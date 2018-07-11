import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  user : boolean;
  admin : boolean;
  redirectUrl : string;

  constructor() { 
    if(sessionStorage.getItem('User') === '0') { this.user = false; } else { this.user = true; }
    if(sessionStorage.getItem('Admin') === '0') { this.admin = false; } else { this.admin = true; }
  }

  login(username, password) : Promise<any> {
    const accessData = {
      accessType: null,
      arrayNo: null
    };

    if(username === 'admin' && password === 'admin'){
      this.admin = true;
      accessData.accessType = 'Admin';
      this.redirectUrl = '/admin';
      return Promise.resolve(accessData);
    }
    else if(username === 'tanushree' && password === 'pass1'){
      this.user = true;
      accessData.accessType = 'User';
      accessData.arrayNo = '0';
      this.redirectUrl = '/user';
      return Promise.resolve(accessData);
    }
    else if(username === 'mrinnaal' && password === 'pass2'){
      this.user = true;
      accessData.accessType = 'User';
      accessData.arrayNo = '1';
      this.redirectUrl = '/user';
      return Promise.resolve(accessData);
    }
    else if(username === 'sunny' && password === 'pass3'){
      this.user = true;
      accessData.accessType = 'User';
      accessData.arrayNo = '2';
      this.redirectUrl = '/user';
      return Promise.resolve(accessData);
    }
    else{
      return Promise.reject('Access Denied');
    }
  }
}
