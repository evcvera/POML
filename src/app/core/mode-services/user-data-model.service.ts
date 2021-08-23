import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ISideBarForm} from '../interfaces/iside-bar-form';

@Injectable({
  providedIn: 'root'
})
export class UserDataModelService {

  userData$: BehaviorSubject<ISideBarForm> = new BehaviorSubject<ISideBarForm>({});

  constructor() { }
}
