import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import { Meeting } from "../../models/meeting.model";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course.model";

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

  constructor(private eventService: EventService, private courseService: CourseService) {

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
}
