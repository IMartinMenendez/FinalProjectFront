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
import {Observable, Subscription} from "rxjs";
import {filter, map, pairwise} from "rxjs/operators";
import {AuthSessionService} from "../../services/auth-session.service";
import {TokenStorageService} from "../../services/token.service";

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
  attendeeEventsId: number[] = [];
  eventList: Meeting[] = [];
  comingSoon: Meeting[] = [];
  courses: Course[] = [];
  modalOpen: boolean = false;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private courseService: CourseService, private authSessionService: AuthSessionService, private tokenService: TokenStorageService) {
    this.date = new Date().toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

    this.eventService.getEventsByAttendee(this.tokenService.getUser().id).subscribe(event => {
      this.attendeeEvents = event;
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

}
