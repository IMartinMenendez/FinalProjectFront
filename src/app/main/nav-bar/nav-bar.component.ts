import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../models/notification.model";
import {AuthSessionService} from "../../services/auth-session.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public static notifications: Notification[] = [];
  public static isNofification: boolean = false;
  public static userId?: number;

  constructor(private tokenService: TokenStorageService, private router: Router, private notificationService: NotificationService, private authSessionService: AuthSessionService) { }

  ngOnInit(): void {
    this.getNotifications();
    NavBarComponent.userId = this.tokenService.getUser().id
  }

  goToHome(){
    if(this.tokenService.getToken() && this.tokenService.getUser()){
      return this.router.navigate(['/home/' + NavBarComponent.userId])
    } else {
      return this.router.navigate(['/login'])
    }
  }

  getNotifications(){
    this.notificationService.getNotificationByUserId(this.tokenService.getUser().id).subscribe(notifications => {
      NavBarComponent.notifications = notifications;
      for(let i =0; i< NavBarComponent.notifications.length; i++){
        NavBarComponent.isNofification = !NavBarComponent.notifications[i].isRead;
      }
    });

  }

  notificationRead(id: number){
    this.notificationService.updateToReadNotification(id).subscribe(response => {
      this.getNotifications();
    })

  }

  isNofification(){
    return NavBarComponent.isNofification;
  }

  isUser(){
    return NavBarComponent.userId;
  }

  getArrayNofifications(){
    return NavBarComponent.notifications;
  }

  logout(){
    this.authSessionService.logout();
    this.tokenService.signOut();
    this.router.navigate(['/login'])
    delete NavBarComponent.userId;
  }

}
