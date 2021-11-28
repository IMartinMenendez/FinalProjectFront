import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";

@Component({
  selector: 'app-your-events',
  templateUrl: './your-events.component.html',
  styleUrls: ['./your-events.component.css']
})
export class YourEventsComponent implements OnInit {
  eventList!: Meeting[];
  comingSoon: Meeting[] = [];
  date: string;

  constructor(private eventService: EventService) {
    this.date = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  ngOnInit(): void {
    this.eventService.getEventByUserId(1).subscribe( events => {
      this.eventList = events;
    })
  }

}
