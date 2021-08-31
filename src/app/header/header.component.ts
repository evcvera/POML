import { Component, OnInit } from '@angular/core';
import {UserDataModelService} from '../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userDataModelService: UserDataModelService) { }

  public isCollapsed = true;

  ngOnInit(): void {
  }

  toggleForm(): void{
    this.userDataModelService.toggleForm$.next(true);
  }

}
