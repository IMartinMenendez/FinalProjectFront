import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseUrl: string = 'http://localhost:8082';

  isNotification: boolean = false;

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl + '/Notifications');
  }

  getNotificationById(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl + '/Notification/'+id);
  }

  getNotificationByUserId(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl + '/Notifications/'+userId);
  }

  updateToReadNotification(notificationId: number, notification?: Notification): Observable<Notification>{
    return this.http.put<Notification>(this.baseUrl + '/Notifications/'+notificationId, notification);
  }

  getNotification(){
    return this.isNotification;
  }

  setNotification(notification: boolean){
    this.isNotification = notification;
  }

}
