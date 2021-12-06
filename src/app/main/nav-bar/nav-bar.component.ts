import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../models/notification.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public static notifications: Notification[] = [];
  public static isNofification: boolean = false;


  constructor(private tokenService: TokenStorageService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  goToHome(){
    if(this.tokenService.getToken() && this.tokenService.getUser()){
      return this.router.navigate(['/home/' + this.tokenService.getUser().id])
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
      console.log(response);
      this.getNotifications();
    })

  }

  isNofification(){
    return NavBarComponent.isNofification;
  }

  getArrayNofifications(){
    return NavBarComponent.notifications;
  }

}
