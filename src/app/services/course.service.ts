import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Course } from "../models/course.model";
import {Meeting} from "../models/meeting.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly baseUrl: string = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl + '/Courses');
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(this.baseUrl + '/Courses/'+id);
  }

  getEventByUserId(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl + '/Course/'+ userId);
  }
}
