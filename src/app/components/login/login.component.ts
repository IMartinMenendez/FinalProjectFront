import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../services/token.service";
import {AuthSessionService} from "../../services/auth-session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailUser: string ="";
  passwordUser: string = "";
  error: string = "";

  //form fields
  registerForm: FormGroup;
  emailInput: FormControl;
  passwordInput: FormControl;

  constructor(private userService: UserService, private router: Router, private tokenService: TokenStorageService, private authSessionService: AuthSessionService) {
    this.emailInput = new FormControl('', [Validators.required, Validators.email]);
    this.passwordInput = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.registerForm = new FormGroup({
      email: this.emailInput,
      password: this.passwordInput,
    });
  }

  ngOnInit(): void {
  }

  login(){
        this.authSessionService.login(this.emailUser, this.passwordUser).subscribe(user => {
          this.tokenService.saveToken(user.token);
          this.tokenService.saveUser(user);
          this.router.navigate(['/home', user.id])

        },
          error => this.error = "User or Password incorrect"
  )}
}
