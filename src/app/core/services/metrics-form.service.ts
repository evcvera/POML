import {Injectable} from '@angular/core';
import {ISideBarForm} from "../interfaces/iside-bar-form";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {IUser} from "../interfaces/iuser";

@Injectable({
  providedIn: 'root'
})
export class MetricsFormService {

  constructor(private http: HttpClient,) {
  }

  postMetricForm(metricsForm: ISideBarForm): Observable<ISideBarForm> {

    return this.http.post<ISideBarForm>(`${environment.myUrl}/metrics_form`, metricsForm).pipe(
      map(result => {
        return result;
      }));

    /*    return this.http.post<IUser>(`${environment.myUrl}/login`, { email, password })
          .pipe(map(result => {
            localStorage.setItem('currentUser', JSON.stringify(result));
            this.currentUserSubject$.next(result);
            return result;
          }));*/
  }

  get(): Observable<ISideBarForm> {
    return this.http.get<ISideBarForm>(`${environment.myUrl}/metrics_form`).pipe(
      map(result => {
        return result;
      }));
  }

}
