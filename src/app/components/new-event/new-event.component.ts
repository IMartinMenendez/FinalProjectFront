import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CourseService} from "../../services/course.service";
import {AuthSessionService} from "../../services/auth-session.service";
import {TokenStorageService} from "../../services/token.service";
import {Meeting} from "../../models/meeting.model";
import {CreateMeetingModel} from "../../models/createMeeting.model";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  userId!: number;
  event: CreateMeetingModel = new CreateMeetingModel( "ONG", new Date(1,12,2020), 'Madrid', 'Help kids!', "Help kids in Madrid", this.userId, [], "https://www.todaysparent.com/wp-content/uploads/2018/09/ways-to-help-kids-with-autism-have-great-playdates-1280x960.jpg");

  userName!: string;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private courseService: CourseService, private authSessionService: AuthSessionService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;
    this.userName = this.tokenService.getUser().name;

  }

  logout(){
    this.authSessionService.logout();
    this.tokenService.signOut();
    this.router.navigate(['/'])
  }

  createEvent(): void{
    this.eventService.createEvent(this.event).subscribe(event => {
      this.router.navigate(['/your-events/' + this.userId])
    });
  }

}
