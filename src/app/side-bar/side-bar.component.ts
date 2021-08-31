import {Component, OnInit} from '@angular/core';
import {UserDataModelService} from '../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(public userDataModelService: UserDataModelService) {
  }

  public isCollapsed = false;

  ngOnInit(): void {
    this.userDataModelService.toggleForm$.subscribe((resp) => {
        this.isCollapsed = resp;
    });
  }

  changeTogle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
