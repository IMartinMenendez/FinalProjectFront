import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../services/token.service";
import {ModalComponent} from "../modal/modal.component";

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
  userAttendee: boolean = false;
  attendees: User[] = [];
  similarEvents!: Meeting[];
  eventId: number= 0;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private tokenService: TokenStorageService) {


  }

  ngOnInit(): void {
    this.eventId  = this.activatedRoute.snapshot.params['postId'];
    this.getEventDetails();
  }

  getEventDetails(){
    this.eventService.getEventById(this.eventId).subscribe(
      event => {
        this.meeting = event;
        this.getAllAttendees();
        this.filter();
        this.userAttendeeCheck();
        this.userService.getUserById(this.meeting.creator).subscribe(
          user => {
            this.creator = user;
          }
        );
      }
    );
  }

  userAttendeeCheck(){
    this.eventService.getEventById(this.meeting.id).subscribe(response => {
      this.meeting = response;
      this.userAttendee = !!this.meeting.attendees.find(a => a === this.tokenService.getUser().id);
    })

  }


  join(meetingId: number) {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login'])
    } else if (this.tokenService.getUser()) {
      if(!this.attendees.find(e => e === this.tokenService.getUser().id)){
        this.eventService.addAttendee(meetingId, this.tokenService.getUser().id).subscribe(answer => {
            this.modalOpen = true;
            this.userAttendee = true;
            this.getEventDetails();
            ModalComponent.message = "You successfully joined this event!"
          },
          error => this.message = "You are already enrolled in this course!")
      } else {
        ModalComponent.message = "You are already enrolled in this course!"
      }
    }
  }

  checkCreator(){
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
      ModalComponent.message = "Your event has been changed!"
    })
  }

  getAllAttendees(){
    this.attendees = [];
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

    goToThisEvent(event: Meeting){
      this.eventService.getEventById(event.id).subscribe(
        event => {
          this.meeting = event;
          this.getEventDetails();
        }
      );
      window.scrollTo(0,  20);
      this.router.navigate(['/event/' + event.id])
    }

  unattend(id: number){
    this.eventService.removeAttendee(id, this.tokenService.getUser().id).subscribe(response => {
      this.modalOpen = true;
      this.userAttendee = false;
      this.getEventDetails();
      ModalComponent.message = "You have unattended from this event";
    })
  }
}
