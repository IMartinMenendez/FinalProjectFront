import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';
import { SliderComponent } from './main/slider/slider.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardEventComponent } from './main/card-event/card-event.component';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import {HttpClientModule} from "@angular/common/http";
import { CarouselComponent } from './main/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    CardEventComponent,
    WelcomeComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EventComponent,
    PagenotfoundComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
