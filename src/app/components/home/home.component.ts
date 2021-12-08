import {Component, OnInit} from '@angular/core';
import {EventService} from "../../services/event.service";
import {Meeting} from "../../models/meeting.model";
import {Course} from "../../models/course.model";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  RoutesRecognized
} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CourseService} from "../../services/course.service";
import {User} from "../../models/user.model";
import {Notification} from "../../models/notification.model";
import {AuthSessionService} from "../../services/auth-session.service";
import {TokenStorageService} from "../../services/token.service";
import {NotificationService} from "../../services/notification.service";
import {ScopeData} from "@angular/compiler-cli/src/ngtsc/scope";
import {EmitScope} from "@angular/compiler-cli/linker/src/file_linker/emit_scopes/emit_scope";
import {NavBarComponent} from "../../main/nav-bar/nav-bar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  welcomeMessage: string = "";
  new: string = "";
  userId!: number;
  user!: User;
  date: string;
  attendeeEvents: Meeting[] = [];
  eventList: Meeting[] = [];
  comingSoon: Meeting[] = [];
  courses: Course[] = [];
  modalOpen: boolean = false;
  today: string;
  eventsForToday: Meeting[] = [];

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private courseService: CourseService, private authSessionService: AuthSessionService, private tokenService: TokenStorageService, private notificationService: NotificationService) {
    this.date = new Date().toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let date = new Date();
    this.today = date.getUTCFullYear()         + '-' +
      this.pad(date.getUTCMonth() + 1)  + '-' +
      this.pad(date.getUTCDate())       + ' ' +
      this.pad(date.getUTCHours())      + ':' +
      this.pad(date.getUTCMinutes())    + ':' +
      this.pad(date.getUTCSeconds());
  }

  ngOnInit(): void {
    if(!this.tokenService.getToken()){
      this.router.navigate(['/register'])
    }
    this.userId = this.tokenService.getUser().id;
    this.new = this.activatedRoute.snapshot.params['new'];

    if (this.new === "new") {
      this.welcomeMessage = "Welcome"
    } else {
      this.welcomeMessage = "Welcome back"
    }

    this.getNotifications();

    this.eventService.getEventsByAttendee(this.tokenService.getUser().id).subscribe(event => {
      this.attendeeEvents = event;
    })

    this.eventService.getEventByDate(this.today, this.tokenService.getUser().id).subscribe(events => {
      this.eventsForToday = events;
    })

    this.courseService.getCourseByUserId(this.tokenService.getUser().id).subscribe(courses => {
      this.courses = courses;
    })
    this.userService.getUserById(this.tokenService.getUser().id).subscribe(user => {
      this.user = user;
    })
  }

  unattend(id: number){
    this.eventService.removeAttendee(id, this.tokenService.getUser().id).subscribe(response => {
      this.modalOpen = true;
      this.eventService.getEventsByAttendee(this.tokenService.getUser().id).subscribe(event => {
        this.attendeeEvents = event;
      })
    })
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

pad(num: number) { return ('00'+num).slice(-2) };

}
