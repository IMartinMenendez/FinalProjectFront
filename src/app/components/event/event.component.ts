import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../services/token.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  meeting!: Meeting;
  creator!: User;
  modalOpen: boolean = false;
  message: string = "";
  edit: boolean = false;
  attendees: User[] = [];
  similarEvents!: Meeting[];

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private tokenService: TokenStorageService) {


  }

  ngOnInit(): void {
    const postId: number = this.activatedRoute.snapshot.params['postId'];
    this.eventService.getEventById(postId).subscribe(
      event => {
        this.meeting = event;
        this.getAllAttendees();
        this.filter();
        this.userService.getUserById(this.meeting.creator).subscribe(
          user => {
            this.creator = user;
          }
        );
      }
    );
  }


  join(meetingId: number) {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login'])
    } else if (this.tokenService.getUser()) {
      this.eventService.addAttendee(meetingId, this.tokenService.getUser().id).subscribe(answer => {
        this.modalOpen = true;
          this.message = "You successfully joined this event!"
      },
        error => this.message = "You are already enrolled in this course!")
    }
  }

  checkCreator(){
    console.log(this.meeting.creator);
    console.log(this.creator.id);
    if(this.meeting.creator === this.tokenService.getUser().id && !this.edit){
      return true;
    }
    return false;
  }

  editMeeting(){
    this.edit = true;
  }

  saveMeeting(id: number){
    this.edit = false;
    this.eventService.updateEvent(this.meeting.id, this.meeting).subscribe(result => {
        this.message = "Your event has been changed!"
    })
  }

  getAllAttendees(){
    if( this.meeting.attendees.length > 0){
      for(let i=0; i < this.meeting.attendees.length; i++){
        this.userService.getUserById(this.meeting.attendees[i]).subscribe(attendee => {
          this.attendees.push(attendee);
        })
      }
    }
  }

  filter(){
      this.eventService.getEventFilterBy(undefined, this.meeting.place).subscribe(events => {
        this.similarEvents = events.filter(event => event.id != this.meeting.id);
        this.similarEvents = this.similarEvents.slice(0, 4);
      })
    }
}
