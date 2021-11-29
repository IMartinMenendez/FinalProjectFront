import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HeaderComponent} from "./main/header/header.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {EventComponent} from "./components/event/event.component";
import {PagenotfoundComponent} from "./components/pagenotfound/pagenotfound.component";
import {YourEventsComponent} from "./components/your-events/your-events.component";
import {NewEventComponent} from "./components/new-event/new-event.component";
import {NewCourseComponent} from "./components/new-course/new-course.component";
import {AllEventsComponent} from "./components/all-events/all-events.component";

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
  {
    path: 'home/:userId',
    component: HomeComponent,
  },
  {
    path: 'home/:userId/:new',
    component: HomeComponent,
  },
  {
    path: 'your-events/:userId',
    component: YourEventsComponent,
  },
  {
    path: 'new-events/:userId',
    component: NewEventComponent,
  },
  {
    path: 'new-course/:userId',
    component: NewCourseComponent,
  },
  {
    path: 'event/:postId',
    component: EventComponent,
  },
  {
    path: 'all-events',
    component: AllEventsComponent,
  },
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
