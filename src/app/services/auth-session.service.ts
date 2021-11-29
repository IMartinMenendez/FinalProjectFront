import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../models/course.model";
import {LoginModel} from "../models/login.model";
import {TokenStorageService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {

  private readonly baseUrl: string = 'http://localhost:8082';

  constructor(private http: HttpClient,  private tokenService: TokenStorageService) {
  }

  login(email: string, password: string): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.baseUrl + '/login', {
      email: email,
      password: password
    });
  }

  logout(): void{
    this.http.delete(this.baseUrl + '/logout', {headers: {'X-Auth-Token': this.tokenService.getToken() || ''}}).subscribe(() => status = 'Delete successful');;
  }
}
