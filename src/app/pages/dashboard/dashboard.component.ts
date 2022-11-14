import {Component, OnInit} from '@angular/core';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';
import {Router} from '@angular/router';
import {AuthenticationGoogleService} from "../../core/model-services/authentication-google.service";
import {AuthenticationModelService} from "../../core/model-services/authentication-model.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router,
              public userDataModelService: UserDataModelService,
              public authenticationGoogleService: AuthenticationGoogleService,
              public authenticationService: AuthenticationModelService) {
  }

  toggleForm(): void {
    this.userDataModelService.toggleForm$.next(true);
  }

  ngOnInit(): void {
    this.authenticationGoogleService.loadProfile();
  }

}
