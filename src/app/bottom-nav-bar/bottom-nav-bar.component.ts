import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserDataModelService} from '../core/mode-services/user-data-model.service';

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss']
})
export class BottomNavBarComponent implements OnInit {

  constructor(public router: Router,
              public userDataModelService: UserDataModelService) { }

  ngOnInit(): void {
  }

  toggleForm(): void{
    this.userDataModelService.toggleForm$.next(true);
  }
  GoToLink(url: string): void {
    window.open(url, '_blank');
  }
}
