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

  constructor(private eventService: EventService, private courseService: CourseService, private tokenService: TokenStorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe( events => {
      this.eventList = events;
      this.createCarousel();
    })
    this.courseService.getCourse().subscribe( course => {
      this.courseList = course;
      console.log(course);
    })
  }

  createCarousel(){
    this.firstPage = this.eventList.slice(0, 3);
    this.secondPage = this.eventList.slice(2, 5);
    this.thirdPage = this.eventList.slice(5, 8);
  }

  seeMore(){
    this.end = this.end +3;
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

joinMeeting(meetingId: number){
    if(!this.tokenService.getToken()){
      this.router.navigate(['/login'])
    } else if (this.tokenService.getUser()) {
      this.eventService.addAttendee(meetingId, this.tokenService.getUser().id).subscribe(answer => {
        this.modalOpen = true;
      })
    }
}

}
