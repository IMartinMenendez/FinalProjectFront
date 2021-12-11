import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course.model";
import {AuthSessionService} from "../../services/auth-session.service";
import {TokenStorageService} from "../../services/token.service";
import {NavBarComponent} from "../../main/nav-bar/nav-bar.component";
import {NotificationService} from "../../services/notification.service";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-your-events',
  templateUrl: './your-events.component.html',
  styleUrls: ['./your-events.component.scss']
})
export class YourEventsComponent implements OnInit {
  eventList: Meeting[] = [];
  todayEvents: Meeting[] = [];
  today: string = "";
  courseList: Course[] = [];
  comingSoon: Meeting[] = [];
  date: string;
  userId: number;
  modalOpen: boolean = false;
  EventId!: number;
  userName: string;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private courseService: CourseService, private authSessionService: AuthSessionService, private tokenService: TokenStorageService, private router: Router, private notificationService: NotificationService) {
    this.userName = tokenService.getUser().name;
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.date = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.calculateTodayDate()
  }

  ngOnInit(): void {
    this.getNotifications();
    if(this.userName && this.today){
      this.getAllData();
    }
  }

  confirmationDelete(id: number){
    this.modalOpen = true;
    this.EventId = id;
  }

  sendAlertReceived(message: any): void {
    this.getAllData();
  }

  deleteEvent(event: Meeting) {
    ModalComponent.isDelete = true;
    ModalComponent.message = "Are you sure you want to delete this event?";
    ModalComponent.onClick = () => {
      this.eventService.deleteEvent(event.id).subscribe(event => {
        ModalComponent.message = "This Event was successfully removed!";
      });
    }
  }

  logout(){
    this.authSessionService.logout();
    this.tokenService.signOut();
    this.router.navigate(['/'])
  }

  getNotifications(){
    this.notificationService.getNotificationByUserId(this.tokenService.getUser().id).subscribe(notifications => {
      NavBarComponent.notifications = notifications;
      for(let i =0; i< NavBarComponent.notifications.length; i++){
        NavBarComponent.isNofification = !NavBarComponent.notifications[i].isRead;
      }
    });

  }

  getAllData(){
    this.eventService.getEventByCreator(this.userId).subscribe( events => {
      this.eventList = events.filter(event => event.date != new Date());
    })

    this.eventService.getEventByDateAndUser(this.today ,this.userId).subscribe(events => {
      this.todayEvents = events;
    })

    this.courseService.getCourseByUserId(this.userId).subscribe( course => {
      this.courseList = course;
    })
  }

  calculateTodayDate(){
    this.date = new Date().toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let date = new Date();
    this.today = date.getUTCFullYear()         + '-' +
      this.pad(date.getUTCMonth() + 1)  + '-' +
      this.pad(date.getUTCDate())       + ' '
  }

  pad(num: number) { return ('00'+num).slice(-2) };


}
