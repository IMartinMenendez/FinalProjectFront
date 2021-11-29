import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../models/user.model";
import {CreateUserModel} from "../models/createUser.model";
import {catchError, retry} from "rxjs/operators";

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

  getUserByEmail(email: string, password: string): Observable<User> | Observable<any>{
    return this.http.get<User>(this.baseUrl + '/User?email=' + email + "&password=" + password).pipe(
      catchError(error => {
        let errorMsg;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
          window.alert(errorMsg);
          return errorMsg;
        } else {
           errorMsg = `Error: ${error.message}`;
          window.alert(errorMsg);
          return errorMsg;
        }
      })
    );
  }


  createNewUser(user: CreateUserModel): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/Users', {
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      password: user.password,
    }, httpOptions);
  }

}
