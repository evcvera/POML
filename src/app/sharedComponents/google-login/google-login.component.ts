import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationGoogleService} from "../../core/model-services/authentication-google.service";

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  @Input() isLogin = true;

  constructor(public authenticationGoogleService: AuthenticationGoogleService) {

  }

  ngOnInit(): void {
  }

}
