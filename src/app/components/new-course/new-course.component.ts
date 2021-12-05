import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CourseService} from "../../services/course.service";
import {AuthSessionService} from "../../services/auth-session.service";
import {TokenStorageService} from "../../services/token.service";
import {Meeting} from "../../models/meeting.model";
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  userId!: number;
  course: Course = new Course(1, "ONG",'Help kids!', "Help kids in Madrid",   "https://www.todaysparent.com/wp-content/uploads/2018/09/ways-to-help-kids-with-autism-have-great-playdates-1280x960.jpg");

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

  create(){
    this.courseService.createCourse(this.course).subscribe(course => {

    });
  }

}
