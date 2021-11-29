import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Course } from "../models/course.model";
import {Meeting} from "../models/meeting.model";
import {TokenStorageService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly baseUrl: string = 'http://localhost:8082';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl + '/Courses');
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(this.baseUrl + '/Courses/'+id);
  }

  getCourseByUserId(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl + '/Course/'+ userId, {headers: {'X-Auth-Token': this.tokenService.getToken() || ''}});
  }
}
