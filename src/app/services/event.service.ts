import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meeting} from "../models/meeting.model";
import {TokenStorageService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly baseUrl: string = 'http://localhost:8082';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
  }

  getAllEvents(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.baseUrl + '/Events');
  }

  getEventById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(this.baseUrl + '/Events/' + id);
  }

  getEventByUserId(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.baseUrl + '/Event/' + userId , {headers: {'X-Auth-Token': this.tokenService.getToken() || ''}});
  }

  getEventByCreator(creator: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.baseUrl + '/myevents/' + creator, {headers: {'X-Auth-Token': this.tokenService.getToken() || ''}})
  }

  getEventsByAttendee(attendeeId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.baseUrl + '/Event/Attendees/' + attendeeId, {headers: {'X-Auth-Token': this.tokenService.getToken() || ''}})
  }

  deleteEvent(id: number): Observable<Meeting> {
    return this.http.delete<Meeting>(this.baseUrl + '/Event/' + id);
  }

  updateEvent(id: number, event: Event): Observable<Meeting> {
    return this.http.put<Meeting>(this.baseUrl + '/Event/' + id, event);
  }

  addAttendee(id: number, attendeesId: number): Observable<Meeting> {
    return this.http.put<Meeting>(this.baseUrl + '/Event/Attendees/' + id, attendeesId);
  }

  removeAttendee(id: number, attendeesId: number): Observable<Meeting> {
    return this.http.put<Meeting>(this.baseUrl + '/Event/Attendees-remove/' + id, attendeesId);
  }

  createEvent(event: Event): Observable<Meeting> {
    return this.http.post<Meeting>(this.baseUrl + '/Events', event);
  }
}
