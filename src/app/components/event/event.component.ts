import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  meeting!: Meeting;
  creator!: User;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {


  }

  ngOnInit(): void {
    const postId: number = this.activatedRoute.snapshot.params['postId'];
    this.eventService.getEventById(postId).subscribe(
      event => {
        this.meeting = event;
        this.userService.getUserById(this.meeting.creator).subscribe(
          user => {
            console.log(user);
            this.creator = user;
          }
        );
      }
    );
  }

  join(id: number, attendee: number){
    this.eventService.addAttendee(id, attendee);
  }
}
