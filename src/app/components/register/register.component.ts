import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateUserModel} from "../../models/createUser.model";
import {Token} from "@angular/compiler";
import {TokenStorageService} from "../../services/token.service";
import {AuthSessionService} from "../../services/auth-session.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user!: CreateUserModel;
  name: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";
  role: string = "User";
  isAdmin: boolean = false;

  //form fields
  registerForm: FormGroup;
  nameInput: FormControl;
  emailInput: FormControl;
  passwordInput: FormControl;
  passwordConfirmationInput: FormControl;

  constructor(private router: Router, private userService: UserService, private tokenService: TokenStorageService, private authSessionService: AuthSessionService) {
    this.nameInput = new FormControl('',  Validators.required );
    this.emailInput = new FormControl('', [Validators.required, Validators.email]);
    this.passwordInput = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.passwordConfirmationInput = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.registerForm = new FormGroup({
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
      passwordConfirmation: this.passwordConfirmationInput,
    });
  }

  ngOnInit(): void {
  }

  signUp() {
    this.user = new CreateUserModel(this.name, this.email, this.role, this.isAdmin, this.password)
    this.userService.createNewUser(this.user).subscribe(userId => {
        this.router.navigate(['/login'])
      });
  }

  isInvalidForm(): boolean{
    if(this.registerForm.invalid){
      return true;
    }

    if(this.password != this.password2){
      return true;
    }
    return false;
  }

}
