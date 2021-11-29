import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private tokenService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  goToHome(){
    if(this.tokenService.getToken() && this.tokenService.getUser()){
      return this.router.navigate(['/home/' + this.tokenService.getUser().id])
    } else {
      return this.router.navigate(['/login'])
    }
  }

}
