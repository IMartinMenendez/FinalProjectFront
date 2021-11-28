import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = 'http://localhost:8082';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/Users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/Users/' + id);
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/Users', {
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      password: user.password,
    }, httpOptions);
  }
}
