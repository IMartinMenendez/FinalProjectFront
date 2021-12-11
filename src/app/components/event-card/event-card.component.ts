import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../../services/token.service";
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {Router} from "@angular/router";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input('event')
  meeting!: Meeting;
  @Output()
  sendAlertEvent: EventEmitter<number> = new EventEmitter();
  userId: number = 0;
  userAttendee: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private tokenService: TokenStorageService, private eventService: EventService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    this.userId = this.tokenService.getUser().id;
    this.userAttendee = !!this.meeting.attendees.find(a => a === this.userId);
  }

  unattend(id: number) {
    ModalComponent.isDelete = false;
    this.eventService.removeAttendee(id, this.tokenService.getUser().id).subscribe(response => {
      ModalComponent.message = "You have unattended from this event";
      this.userAttendee = false;
      this.sendAlert();
    })
  }

  joinMeeting(meetingId: number) {
    ModalComponent.isDelete = false;
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login'])
    } else if (this.tokenService.getUser()) {
      this.eventService.addAttendee(meetingId, this.tokenService.getUser().id).subscribe(answer => {
          ModalComponent.message = "You successfully joined this event!"
          this.userAttendee = true;
          this.sendAlert();
        },
        error => ModalComponent.message = "You are already enrolled in this course!")
    }
  }

  confirmationDelete() {
    ModalComponent.isDelete = true;
    ModalComponent.message = "Are you sure you want to delete this event?";
    ModalComponent.onClick = () => {
      this.eventService.deleteEvent(this.meeting.id).subscribe(event => {
        ModalComponent.message = "This Event was successfully removed!";
        this.sendAlert();
      });
    }
  }

  sendAlert(): void {
    this.sendAlertEvent.emit(this.meeting.id);
  }
}
