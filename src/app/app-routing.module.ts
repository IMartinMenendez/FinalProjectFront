import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HeaderComponent} from "./main/header/header.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {EventComponent} from "./components/event/event.component";
import {PagenotfoundComponent} from "./components/pagenotfound/pagenotfound.component";

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  // {
  //   path: 'home/{id}',
  //   component: HomeComponent,
  // },
  // {
  //   path: 'event/{id}',
  //   component: EventComponent,
  // },
  // {
  //   path: '**',
  //   component: PagenotfoundComponent,
  // }
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
