import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';
import { SliderComponent } from './main/slider/slider.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import {HttpClientModule} from "@angular/common/http";
import { YourEventsComponent } from './components/your-events/your-events.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { ModalComponent } from './components/modal/modal.component';
import { CourseComponent } from './components/course/course.component';
import {AvatarModule} from "ngx-avatar";
import { FooterComponent } from './components/footer/footer.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { CourseCardComponent } from './components/course-card/course-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    WelcomeComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EventComponent,
    PagenotfoundComponent,
    YourEventsComponent,
    NewEventComponent,
    NewCourseComponent,
    AllEventsComponent,
    ModalComponent,
    CourseComponent,
    FooterComponent,
    EventCardComponent,
    LateralMenuComponent,
    CourseCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
