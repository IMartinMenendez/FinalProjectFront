import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {TokenStorageService} from "../../services/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  allEvents: Meeting[] = [];
  modalOpen: boolean = false;
  totalPages: number = 0;
  numberPages: number[] = [];
  page: Meeting[] = [];
  pagination: number = 0;
  maxPages: number = 6;
  type!: string | null;
  place!: string | null;

  constructor(private eventService: EventService, private tokenService: TokenStorageService, private router: Router,  private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = params['type'];
      this.place = params['place']
    });

    if(this.type || this.place){
      this.eventService.getEventFilterBy(this.type, this.place).subscribe(events => {
        this.allEvents = events;
        this.paginationCalculation();
        this.calculateMaxPages();
      })
    } else {
      this.eventService.getAllEvents().subscribe(events => {
        this.allEvents = events;
        this.paginationCalculation();
        this.calculateMaxPages();
      })
    }

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


  paginationCalculation(){
    this.page = this.allEvents.slice(this.pagination *6, (this.pagination * 6)+6)
  }

  calculateMaxPages(){
    this.numberPages = [];
    this.maxPages = this.allEvents.length/6;
    for(let i = 0; i< this.maxPages; i++){
      this.numberPages.push(i);
    }
  }

  next(){
    this.pagination = this.pagination +1;
    this.paginationCalculation();
  }

  previous(){
    this.pagination = this.pagination -1;
    this.paginationCalculation();
  }

  goToPage(event: number){
    this.pagination = event;
    this.paginationCalculation();
  }

}
