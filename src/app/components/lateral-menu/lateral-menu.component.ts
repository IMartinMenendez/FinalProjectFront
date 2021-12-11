import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CourseService} from "../../services/course.service";
import {AuthSessionService} from "../../services/auth-session.service";
import {TokenStorageService} from "../../services/token.service";

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent implements OnInit {
  userId!: number;
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
}
