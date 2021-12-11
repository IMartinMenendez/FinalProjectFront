import {Component, Input, OnInit} from '@angular/core';
import {Meeting} from "../../models/meeting.model";
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input('course')
  course!: Course;

  constructor() { }

  ngOnInit(): void {
  }

}
