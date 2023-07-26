import { Component, OnInit } from '@angular/core';
import {UserDataModelService} from '../../core/model-services/user-data-model.service';

@Component({
  selector: 'app-complete-form',
  templateUrl: './complete-form.component.html',
  styleUrls: ['./complete-form.component.scss']
})
export class CompleteFormComponent implements OnInit {

  constructor(private userDataModelService: UserDataModelService) { }

  ngOnInit(): void {
  }

  toggleForm(): void {
    this.userDataModelService.toggleForm$.next(true);
  }

}
