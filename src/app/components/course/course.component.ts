import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course.model";
import {User} from "../../models/user.model";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course!: Course;
  creator!: User;
  message: string = "";
  edit: boolean = false;
  safeURL!: SafeResourceUrl;

  constructor(private activatedRoute: ActivatedRoute, private couseService: CourseService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const postId: number = this.activatedRoute.snapshot.params['postId'];
    this.couseService.getCourseById(postId).subscribe(
      course => {
        this.course = course;
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(course.link);
        console.log(course.link);
      }
    );
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

}
