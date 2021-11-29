import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {TokenStorageService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  allEvents: Meeting[] = [];

  constructor(private eventService: EventService, private tokenService: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    if(!this.tokenService.getToken()){
      this.router.navigate(['/register'])
    }
    this.eventService.getAllEvents().subscribe(event => {
      this.allEvents = event;
    })
  }

}
