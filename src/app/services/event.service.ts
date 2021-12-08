import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meeting} from "../models/meeting.model";
import {TokenStorageService} from "./token.service";
import {CreateMeetingModel} from "../models/createMeeting.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

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

  getEventComingSoon(date: string) : Observable<Meeting[]>{
    return this.http.get<Meeting[]>(this.baseUrl + '/ComingSoon/' + date);

  }

  getEventByDate(date: string, creator: number) : Observable<Meeting[]>{
    return this.http.get<Meeting[]>(this.baseUrl + '/Event/date/' + date + '/' + creator);
  }

  getEventFilterBy(type?: string | null, place?: string | null)  : Observable<Meeting[]>{
    return this.http.get<Meeting[]>(this.baseUrl + '/EventFilter?type=' + type + "&place=" + place);
  }

  deleteEvent(id: number): Observable<Meeting> {
    return this.http.delete<Meeting>(this.baseUrl + '/Event/' + id);
  }

  updateEvent(id: number, event: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(this.baseUrl + '/Event/' + id, event);
  }

  addAttendee(id: number, attendeesId: number): Observable<Meeting> {
    return this.http.put<Meeting>(this.baseUrl + '/Event/Attendees/' + id, attendeesId);
  }

  removeAttendee(id: number, attendeesId: number): Observable<Meeting> {
    return this.http.put<Meeting>(this.baseUrl + '/Event/Attendees-remove/' + id, attendeesId);
  }

  createEvent(event: CreateMeetingModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Events', {
      type: event.type,
      date: event.date,
      place: event.place,
      title: event.title,
      description: event.description,
      creator: event.creator,
      attendees: event.attendees,
      picture: event.picture
    }, httpOptions);
  }
}
