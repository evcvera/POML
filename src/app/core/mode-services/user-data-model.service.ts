import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ISideBarForm} from '../interfaces/iside-bar-form';

@Injectable({
  providedIn: 'root'
})
export class UserDataModelService {

  userData$: BehaviorSubject<ISideBarForm> = new BehaviorSubject<ISideBarForm>({});
  toggleForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
  searchData$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  pageNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pageSort$: BehaviorSubject<string> = new BehaviorSubject<string>('relevance');

  constructor() {
  }
}
