import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseUrl: string = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl + '/Notifications');
  }

  getNotificationById(id: number): Observable<Notification> {
    return this.http.get<Notification>(this.baseUrl + '/Notifications/'+id);
  }
}
