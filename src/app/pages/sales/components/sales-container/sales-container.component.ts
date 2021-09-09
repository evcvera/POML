import { Component, OnInit } from '@angular/core';
import {MeliModelService} from '../../../../core/mode-services/meli-model.service';
import {UserDataModelService} from '../../../../core/mode-services/user-data-model.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales-container',
  templateUrl: './sales-container.component.html',
  styleUrls: ['./sales-container.component.scss']
})
export class SalesContainerComponent implements OnInit {

  constructor(public meliModelService: MeliModelService,
              public userDataModelService: UserDataModelService,
              private router: Router) { }

  ngOnInit(): void {
  }

}
