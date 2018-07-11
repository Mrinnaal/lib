import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
import { UserComponent } from '../user/user.component';

import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'admin', canActivate: [ AuthGuardService ], component: AdminComponent },
    { path: 'user', canActivate: [ AuthGuardService ], component: UserComponent, data: { id: null} }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutesModule { }