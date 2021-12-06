import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import { Meeting } from "../../models/meeting.model";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course.model";
import {TokenStorageService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  eventList!: Meeting[];
  firstPage!: Meeting[];
  secondPage!: Meeting[];
  thirdPage!: Meeting[];
  courseList!: Course[];
  end: number = 3;
  modalOpen: boolean = false;
  today: string;
  eventType!: string;
  eventLocation!: string;

  constructor(private eventService: EventService, private courseService: CourseService, private tokenService: TokenStorageService, private router: Router) {
    let date = new Date();
    this.today = date.getUTCFullYear()         + '-' +
      this.pad(date.getUTCMonth() + 1)  + '-' +
      this.pad(date.getUTCDate())       + ' ' +
      this.pad(date.getUTCHours())      + ':' +
      this.pad(date.getUTCMinutes())    + ':' +
      this.pad(date.getUTCSeconds());
    console.log(this.today);
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe( events => {
      this.eventList = events;
      this.createCarousel();
    })
    this.courseService.getCourse().subscribe( course => {
      this.courseList = course;
    })
  }

  createCarousel(){
    this.eventService.getEventComingSoon(this.today).subscribe(events => {
      console.log(this.today);
      this.firstPage = events.slice(0, 3);
      this.secondPage = events.slice(3, 6);
      this.thirdPage = events.slice(6, 9);
    })

  }

  seeMore(){
    this.end = this.end +3;
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

joinMeeting(meetingId: number) {
  if (!this.tokenService.getToken()) {
    this.router.navigate(['/login'])
  } else if (this.tokenService.getUser()) {
    this.eventService.addAttendee(meetingId, this.tokenService.getUser().id).subscribe(answer => {
      this.modalOpen = true;
    })
  }
}

goToAllEvents(){
    if(this.eventType && !this.eventLocation){
      this.router.navigate(['/all-events'],
      { queryParams: { type: this.eventType } });
    }else if(this.eventLocation && !this.eventType){
    this.router.navigate(['/all-events'],
      { queryParams: { place: this.eventLocation } });
  }  else if(this.eventLocation && this.eventType){
      this.router.navigate(['/all-events'],
        { queryParams: { type: this.eventType , place: this.eventLocation} });
    }else {
      this.router.navigate(['/all-events']);
    }
}

  pad(num: number) { return ('00'+num).slice(-2) };

}
