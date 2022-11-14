import { Injectable } from '@angular/core';
import {IUser} from "../interfaces/iuser";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class AuthenticationModelService {
  public currentUserSubject$: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject$ = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject$.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject$.value;
  }

  login(email: string , password: string ): Observable<IUser> {
    return this.http.post<IUser>(`${environment.myUrl}/login`, { email, password })
      .pipe(map(result => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.currentUserSubject$.next(result);
        return result;
      }));
  }

  gLogin(google_token: string): Observable<IUser> {
    return this.http.post<IUser>(`${environment.myUrl}/google/login`, { google_token })
      .pipe(map(result => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.currentUserSubject$.next(result);
        this.router.navigate(['metrics']).then();
        return result;
      }));
  }
}
