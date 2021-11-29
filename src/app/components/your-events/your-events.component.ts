import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-your-events',
  templateUrl: './your-events.component.html',
  styleUrls: ['./your-events.component.css']
})
export class YourEventsComponent implements OnInit {
  eventList!: Meeting[];
  courseList!: Course[];
  comingSoon: Meeting[] = [];
  date: string;
  userId: number;
  modalOpen: boolean = false;
  EventId!: number;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private courseService: CourseService) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.date = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  ngOnInit(): void {
    this.eventService.getEventByCreator(this.userId).subscribe( events => {
      this.eventList = events;
    })

    this.courseService.getCourseByUserId(this.userId).subscribe( course => {
      this.courseList = course;
    })
  }

  confirmationDelete(id: number){
    this.modalOpen = true;
    this.EventId = id;
  }


  goToLink(url: string){
    window.open(url, "_blank");
  }

  removeEvent() {
    this.eventService.deleteEvent(this.EventId).subscribe(event => {
      this.eventList = this.eventList.filter((meeting) =>
        meeting.id != this.EventId )
    })
    this.modalOpen = false;
  }


}
