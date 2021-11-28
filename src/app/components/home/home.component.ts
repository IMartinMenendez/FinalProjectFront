import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {Course} from "../../models/course.model";
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CourseService} from "../../services/course.service";
import {User} from "../../models/user.model";
import {Observable, Subscription} from "rxjs";
import {filter, map, pairwise} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  welcomeMessage: string = "";
  new: string ="";
  userId!: number;
  user!: User;
  date: string;
  eventList: Meeting[] = [];
  comingSoon: Meeting[] = [];
  courses: Course[] = [];

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private courseService: CourseService) {
    this.date = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  ngOnInit(): void {
    this.new = this.activatedRoute.snapshot.params['new'];
    if(this.new === "new"){
      this.welcomeMessage = "Welcome"
    }else{
      this.welcomeMessage = "Welcome back"
    }

    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.eventService.getEventByUserId(this.userId).subscribe( events => {
      this.eventList = events;
    })

    this.courseService.getEventByUserId(this.userId).subscribe( courses => {
      this.courses = courses;
    })
    this.userService.getUserById(this.userId).subscribe( user => {
      this.user = user;
    })
  }


}
