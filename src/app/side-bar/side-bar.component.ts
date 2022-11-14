import {Component, OnInit} from '@angular/core';
import {UserDataModelService} from '../core/model-services/user-data-model.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  toggleSubscription: Subscription;

  constructor(public userDataModelService: UserDataModelService) {
  }

  public isCollapsed = false;

  ngOnInit(): void {
    if (this.toggleSubscription) {
      this.toggleSubscription.unsubscribe();
    }
    this.toggleSubscription = this.userDataModelService.toggleForm$.subscribe((resp) => {
      this.isCollapsed = resp;
    });
  }

  changeTogle(): void {
    this.isCollapsed = !this.isCollapsed;
    this.userDataModelService.toggleForm$.next(false);
  }

}
