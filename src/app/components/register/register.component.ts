import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user!: User;
  name: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";
  role: string = "";
  isAdmin: boolean = false;

  //form fields
  registerForm: FormGroup;
  nameInput: FormControl;
  emailInput: FormControl;
  passwordInput: FormControl;
  passwordConfirmationInput: FormControl;

  constructor(private router: Router, private userService: UserService) {
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

  login() {
    this.user = new User(this.name, this.email, this.role, this.isAdmin, this.password)
    this.userService.createNewUser(this.user).subscribe(userId => {
        console.log(userId)
        this.router.navigate(['/home', userId, "new"])
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
