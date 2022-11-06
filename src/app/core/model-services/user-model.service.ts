import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/iuser";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {AuthenticationModelService} from "./authentication-model.service";

class AuthenticationService {
}

@Injectable({
  providedIn: 'root'
})
export class UserModelService {
  constructor(private http: HttpClient,
              private authenticationService: AuthenticationModelService) {
  }

  signUp(user: IUser): Observable<IUser> {
    let userJson = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    }

    const formData: FormData = new FormData();
    formData.append('image', new Blob([user.image]));
    formData.append('data', JSON.stringify(userJson));

    return this.http.post<IUser>(`${environment.apiUrl}/user`, formData)
      .pipe(map(result => {
        return result;
      }));
  }

  changePassword(changeUserPassword: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/useraccount/changepassword`, changeUserPassword)
      .pipe(map(resp => {
        return resp;
      }));
  }

  updateMedia(field: string, image: any): Observable<IUser> {
    let userJson = {
      uuid: this.authenticationService.currentUserSubject$.value.uuid,
      avatar: this.authenticationService.currentUserSubject$.value.avatar,
      banner: this.authenticationService.currentUserSubject$.value.banner,
    }

    let userData = this.authenticationService.currentUserSubject$.value;

    const formData: FormData = new FormData();
    formData.append('image', new Blob([image]));
    formData.append('data', JSON.stringify(userJson));

    return this.http.patch<IUser>(`${environment.apiUrl}/user/media/${field}`, formData)
      .pipe(map(result => {
        userData.banner = result.banner;
        userData.avatar = result.avatar;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.authenticationService.currentUserSubject$.next(userData);
        return userData;
      }));
  }

  deleteMedia(field: string): Observable<IUser> {
    let uuid = this.authenticationService.currentUserSubject$.value.uuid
    let avatar = this.authenticationService.currentUserSubject$.value.avatar
    let banner = this.authenticationService.currentUserSubject$.value.banner

    let userData = this.authenticationService.currentUserSubject$.value;

    return this.http.delete(`${environment.apiUrl}/user/media/${field}`, {
      //body: {uuid, avatar, banner},
    }).pipe(map(result => {
      userData.banner = field === 'banner' ? '' : userData.banner;
      userData.avatar = field === 'avatar' ? '' : userData.avatar;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.authenticationService.currentUserSubject$.next(userData);
      return userData;
    }));
  }

  updateUserInfo(user: IUser): Observable<IUser> {
    let userJson = {
      uuid: this.authenticationService.currentUserSubject$.value.uuid,
      first_name: user.first_name,
      last_name: user.last_name,
      location: user.location,
      occupation: user.occupation,
      biography: user.biography,
    }
    let userData = this.authenticationService.currentUserSubject$.value;

    return this.http.patch<IUser>(`${environment.apiUrl}/user`, JSON.stringify(userJson) )
      .pipe(map(result => {
        userData.first_name = result.first_name;
        userData.last_name = result.last_name;
        userData.location = result.location;
        userData.occupation = result.occupation;
        userData.biography = result.biography;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.authenticationService.currentUserSubject$.next(userData);
        return userData;
      }));
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/forgotpassword`, {email} )
      .pipe(map(resp => {
        return resp;
      }));
  }

}
