import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate, CanActivateChild {

  constructor(
    private authentication: AuthenticationService,
    private router: Router
    ) { }

  check(redirectUrl: string): boolean {
    if (redirectUrl === '/admin') {
      if (this.authentication.admin) 
      {
         return true; 
      }
    }

    if (redirectUrl === '/user') {
      if (this.authentication.user) 
      {
         return true; 
      }
    }

    this.authentication.redirectUrl = redirectUrl;
    const sessionId = 210894;
    
    const navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };
    
    this.router.navigate(['/login']);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.check(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return this.check(`/${route.path}`);
  }
}
