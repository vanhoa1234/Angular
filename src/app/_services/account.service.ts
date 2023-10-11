import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User } from '../_models';
import { LoginedInfo } from '../_models/LoginedInfo';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }
  public get isLogin()
  {
    if(this.userSubject.value)
    {
         return true;
    }
    else return false;
  }
  login(username: string, password: string) {
    return this.http.post<LoginedInfo>("http://192.168.0.71:8094/api/v1/camunda/login", { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(<User> user.content));
        this.userSubject.next(<User>user.content);
        return user;
      }));
  }
  
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/api/Account/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/api/Account/users`).pipe();
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/api/Account/user/${id}`);
  }

 
}
